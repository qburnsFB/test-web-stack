import { Heading } from "../../Common";

type UserNameType = {
    name: string
};

export const UserName = ({ name }: UserNameType) => {
    return (
        <Heading
            className="UserName"
            size="large"
            css={{
                margin: 0,
                display: "inline-block",
                textTransform: "uppercase",
            }}
        >
            {name}
        </Heading>
    )
};