type UserDescriptionType = {
    description: string
};

export const UserDescription = ({ description }: UserDescriptionType) => {
    return (
        <p
            className="UserDescription"
            css={{
                margin: "0.5rem 0 0",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                textAlign: "left",
            }}
        >
            {description}
        </p>
    )
};