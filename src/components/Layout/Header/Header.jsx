import React from "react";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Image,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri";
import logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../redux/features/userSlice";

const LinkButton = ({ url = "/", title, onClose }) => (
    <Link onClick={onClose} to={url}>
        <Button variant={"ghost"}>{title}</Button>
    </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // const user = {
    //     role: "admin",
    // };

    const dispatch = useDispatch();

    const logoutHandler = () => {
        onClose();
        dispatch(userLogout());
    };

    return (
        <>
            <ColorModeSwitcher />

            <Button
                onClick={onOpen}
                colorScheme="yellow"
                width={"12"}
                height={"12"}
                rounded={"full"}
                position={"fixed"}
                top={"6"}
                left={"6"}
                zIndex={"overlay"}
            >
                <RiMenu5Fill />
            </Button>

            <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay backdropFilter={"blur(3px)"} />
                <DrawerContent>
                    <Image src={logo} boxSize="100px" alignSelf={"center"} />
                    <DrawerHeader
                        textAlign={"center"}
                        borderBottomWidth={"1px"}
                    >
                        Wanderlust Adventures
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={"4"} alignItems={"flex-start"}>
                            <LinkButton
                                onClose={onClose}
                                url="/"
                                title="Home"
                            />
                            <LinkButton
                                onClose={onClose}
                                url="/courses"
                                title="Courses"
                            />
                            <LinkButton
                                onClose={onClose}
                                url="/request"
                                title="Request a Course"
                            />
                            <LinkButton
                                onClose={onClose}
                                url="/about"
                                title="About"
                            />
                            <LinkButton
                                onClose={onClose}
                                url="/contact"
                                title="Contact Us"
                            />

                            <HStack
                                justifyContent={"space-evenly"}
                                position={"absolute"}
                                bottom={"2rem"}
                                width="80%"
                            >
                                {isAuthenticated ? (
                                    <>
                                        <VStack>
                                            <HStack>
                                                <Link
                                                    onClick={onClose}
                                                    to="/profile"
                                                >
                                                    <Button
                                                        variant={"ghost"}
                                                        colorScheme="yellow"
                                                    >
                                                        Profile
                                                    </Button>
                                                </Link>

                                                <Button
                                                    variant={"ghost"}
                                                    onClick={logoutHandler}
                                                >
                                                    <RiLogoutBoxLine />
                                                    Logout
                                                </Button>
                                            </HStack>

                                            {user?.role === "admin" && (
                                                <Link
                                                    onClick={onClose}
                                                    to="/admin/dashboard"
                                                >
                                                    <Button
                                                        colorScheme="purple"
                                                        variant={"ghost"}
                                                    >
                                                        <RiDashboardFill
                                                            style={{
                                                                margin: "4px",
                                                            }}
                                                        />
                                                        Dashboard
                                                    </Button>
                                                </Link>
                                            )}
                                        </VStack>
                                    </>
                                ) : (
                                    <>
                                        <Link onClick={onClose} to="/login">
                                            <Button colorScheme="yellow">
                                                Login
                                            </Button>
                                        </Link>

                                        <p>OR</p>

                                        <Link onClick={onClose} to="/register">
                                            <Button colorScheme="yellow">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </HStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Header;
