"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { StyledToolbar } from "./Styles";
import { Wallet } from "./Wallet";

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Mint",
    path: "/mint",
  },
];

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { push } = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsDrawerOpen(newOpen);
  };

  const handleNav = (path: string) => {
    push(path);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              ml: "-18px",
              px: 0,
            }}
          >
            <Image
              src={"/logo-white.svg"}
              style={{
                height: "auto",
                cursor: "pointer",
              }}
              alt="NFT"
              width={50}
              height={50}
            />
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: "2rem" }}>
              {navItems.map((item) => (
                <MenuItem
                  onClick={() => handleNav(item.path)}
                  sx={{ py: "6px", px: "12px" }}
                  key={item.label}
                >
                  <Typography variant="body1" color="text.primary">
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
          >
            <Wallet />
          </Box>
          <Box sx={{ display: { sm: "", md: "none" } }}>
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: "30px", p: "4px" }}
            >
              <MenuIcon />
            </Button>
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{
                  minWidth: "60dvw",
                  p: 2,
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    onClick={() => handleNav(item.path)}
                    key={item.label}
                  >
                    <Typography variant="body2" color="text.primary">
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
