import React, { useState } from "react";
import "./NavbarNew.css";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { menuItems } from "./data/data";
import { c_name } from "../../../info/Info";

function NAvBarNew() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubMenuToggle = (label) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  return (
    <Box w="100vw" bgColor=" #034C7F">
      <Flex
        as="nav"
        align="center"
        mx="auto"
        w={{ base: "90%", md: "80%" }}
        h={{ base: "55px", md: "80%" }}
        justify={{ base: "end", md: "none" }}
        // boxShadow="1px 1px 10px 3px rgba(0, 0, 0, 0.1)"
      >
        <Box
          as="ul"
          className="navigation-menu"
          color="white"
          display={{ base: "none", md: "flex" }}
          w="100%"
          h="50px"
          listStyleType="none"
          zIndex={1}
        >
          {menuItems.map((menuItem, index) => (
            <Box as="li" key={index}>
              <Link to={menuItem.link}>
                {menuItem.label}
                {menuItem.subMenu && <IoIosArrowDown />}
              </Link>
              {menuItem.subMenu && (
                <ul>
                  {menuItem.subMenu.map((subMenuItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subMenuItem.link}>{subMenuItem.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </Box>
          ))}
        </Box>
        <HStack  justify='space-between' align='center'>
          <Image src="/mobilenav.png" w='70%' display={{ md: "none" }}/>
          <Box onClick={handleToggle} display={{ md: "none" }}>
            {isOpen ? (
              <CloseIcon color="white" boxSize="20px" />
            ) : (
              <HamburgerIcon color="white" boxSize="30px" />
            )}
          </Box>
        </HStack>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={handleToggle}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{c_name}</DrawerHeader>
          <DrawerBody>
            {menuItems.map((list) => (
              <React.Fragment key={list.label}>
                <Link to={list.link}>
                  <Button
                    colorScheme="teal"
                    mb={3}
                    w="100%"
                    key={list.label}
                    onClick={() => handleSubMenuToggle(list.label)}
                  >
                    {list.label}
                    {list.subMenu && <IoIosArrowDown />}
                  </Button>
                </Link>
                {list.subMenu && openSubMenu === list.label && (
                  <Box ml={4}>
                    {list.subMenu.map((subMenuItem) => (
                      <Link to={subMenuItem.link} key={subMenuItem.label}>
                        <Button
                          colorScheme="gray"
                          mb={2}
                          w="100%"
                          onClick={() => console.log(subMenuItem.link)}
                        >
                          {subMenuItem.label}
                        </Button>
                      </Link>
                    ))}
                  </Box>
                )}
              </React.Fragment>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default NAvBarNew;
