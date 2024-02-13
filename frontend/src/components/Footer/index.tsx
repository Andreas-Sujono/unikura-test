import React from "react";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link href="/">NFT App&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        textAlign: { sm: "center", md: "left" },
        pb: "2rem",
      }}
    >
      <Divider sx={{ background: "#423c3c", mb: "1.5rem" }} />
      <Copyright />
    </Container>
  );
}
