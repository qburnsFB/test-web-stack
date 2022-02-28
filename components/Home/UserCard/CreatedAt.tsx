export const CreatedAt = () => {
  return (
    <p
      className="CreatedAt"
      css={{
        flex: 1,
        position: "absolute",
        right: "1rem",
        margin: "0.15rem 0 0",
      }}
    >
      created at <span css={{ color: "#b01e1e" }}>01 Feb 2020</span>
    </p>
  );
};
