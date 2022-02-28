import { Button, Heading, MapBox, Modal } from "@components/Common";
import { User } from "@gql/generated";
import { useForm } from "react-hook-form";
import { useDebounce } from "@lib/hooks";

import { useUpdateUserMutation } from "@lib/gql/generated";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { usersAtom } from "@components/Home/store";

type UserModalType = {
  user: User;
  handleToggleModal: () => void;
  visible: boolean;
};

type UserFormType = {
  name: string;
  address: string;
  description: string;
};

export const UserModal = ({
  user,
  visible,
  handleToggleModal,
}: UserModalType) => {
  const [users, setUsers] = useRecoilState(usersAtom);
  const [updateUserResult, updateUser] = useUpdateUserMutation();
  const [serverError, setServerError] = useState(false);
  const { fetching: savingUser } = updateUserResult;

  // Forms and handling submit
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<UserFormType>();
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...nameRest } = register("name", { required: true });
  const onSubmit = async (data: object) => {
    if (isDirty) {
      const updated = await updateUser({ id: user.id, input: data });
      if (!updated.data) {
        console.log(`Error when saving user, ${updated.error}`);
        setServerError(true);
      }
    } else {
      handleToggleModal();
    }
  };

  // Update our user list with the new one so it's reflected immediately
  useEffect(() => {
    if (updateUserResult.data) {
      let newUsers: User[] = [updateUserResult.data.updateUser];
      newUsers = users.map(
        (u: User) => newUsers.find((o) => o.id === u.id) || u
      );
      setUsers(newUsers);
      handleToggleModal();
    }
  }, [updateUserResult]);

  // Focus on mount and reset inputs when modal is closed without saving
  useEffect(() => {
    if (firstInputRef?.current?.focus) {
      firstInputRef.current.focus();
    }
    return reset();
  }, [visible]);

  const { description, name, address } = user;

  // Will attempt to update map block after typing
  const watchAddress = watch("address");
  const debouncedAddress = useDebounce(watchAddress, 500);

  const formErrors = Boolean(Object.keys(errors).length);
  const hasErrors = formErrors || serverError;
  const errorStyle = {
    color: "red",
    fontWeight: "bold",
    "+ input": {
      outline: "2px solid red",
    },
  };
  if (!visible) {
    return null;
  }
  return (
    <Modal
      toggleModal={handleToggleModal}
      visible={visible}
      closable={!savingUser}
    >
      <div>
        <Heading
          size="larger"
          css={{
            margin: "0 0 4rem",
          }}
        >
          Edit User
        </Heading>
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "518px auto",
            gridGap: "4rem",
          }}
        >
          <figure
            css={{
              margin: 0,
              padding: 0,
              width: "518px",
              height: "336px",
              border: 0,
              "> div": {
                borderRadius: "0.5rem",
              },
            }}
          >
            <MapBox address={debouncedAddress || address} />
          </figure>

          <div
            className="UserModalForm"
            css={{
              input: {
                marginBottom: "2rem",
                width: "100%",
              },
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name" css={errors.name && errorStyle}>
                Name
              </label>
              <input
                aria-required="true"
                aria-invalid={errors.name ? "true" : "false"}
                defaultValue={name}
                ref={(e) => {
                  ref(e);
                  firstInputRef.current = e;
                }}
                {...nameRest}
              />
              <label htmlFor="address" css={errors.address && errorStyle}>
                Address
              </label>
              <input
                aria-required="true"
                aria-invalid={errors.address ? "true" : "false"}
                defaultValue={address}
                {...register("address", { required: true })}
              />
              <label
                htmlFor="description"
                css={errors.description && errorStyle}
              >
                Description
              </label>
              <input
                aria-required="true"
                aria-invalid={errors.description ? "true" : "false"}
                defaultValue={description}
                {...register("description", { required: true })}
              />

              {hasErrors ? (
                <p
                  css={{
                    color: "red",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  {serverError
                    ? "There was an error saving, try again."
                    : "All fields are required."}
                </p>
              ) : undefined}

              <div
                css={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  loading={savingUser}
                  type="submit"
                  disabled={formErrors || savingUser}
                >
                  SAVE
                </Button>
                <Button variant="secondary" onClick={handleToggleModal}>
                  CANCEL
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
