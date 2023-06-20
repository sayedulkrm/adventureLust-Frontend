import React, { useState } from "react";
import {
    Avatar,
    Button,
    Container,
    HStack,
    Heading,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { RiDeleteBin7Fill } from "react-icons/ri";
import { FileUploadCss } from "../Auth/Register";
import {
    changeUserPicture,
    clearError,
    clearMessage,
    removeFromPlaylist,
} from "../../redux/features/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/features/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    cancleSubscription,
    clearError as clearSubscriptionError,
    clearMessage as clearSubscriptionMessage,
} from "../../redux/features/subscriptionSlice";

const Profile = ({ user }) => {
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((state) => state.profile);
    const {
        loading: subscriptionLoading,
        message: subscriptionMessage,
        error: subscriptionError,
    } = useSelector((state) => state.subscription);

    const removeFromPlaylistHandler = async (id) => {
        console.log(id);
        await dispatch(removeFromPlaylist(id));
        dispatch(getUserProfile());
    };

    const changeImageSubmitHandler = async (e, image) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("file", image);

        await dispatch(changeUserPicture(myForm));
        dispatch(getUserProfile());
    };

    const cancelSubscriptionHandler = () => {
        dispatch(cancleSubscription());
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        if (message) {
            toast.success(message);
            dispatch(clearMessage());
        }

        if (subscriptionError) {
            toast.error(subscriptionError);
            dispatch(clearSubscriptionError());
        }

        if (subscriptionMessage) {
            toast.success(subscriptionMessage);
            dispatch(clearSubscriptionMessage());
            dispatch(getUserProfile());
        }
    }, [dispatch, error, message, subscriptionMessage, subscriptionError]);

    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Container minH={"100vh"} maxW={"container.lg"} py={"8"}>
            <Heading children="Profile" m={"8"} textTransform={"uppercase"} />

            <Stack
                justifyContent={"flex-start"}
                direction={["column", "row"]}
                alignItems={"center"}
                spacing={["8", "16"]}
                padding={"8"}
            >
                <VStack>
                    <Avatar boxSize={"40"} src={user.avatar.url} />

                    <Button
                        onClick={onOpen}
                        colorScheme="yellow"
                        variant={"ghost"}
                    >
                        Change Photo
                    </Button>
                </VStack>

                <VStack spacing={"4"} alignItems={["center", "flex-start"]}>
                    <HStack>
                        <Text children="Name:" fontWeight={"bold"} />
                        <Text children={user.name} />
                    </HStack>

                    <HStack>
                        <Text children="Email:" fontWeight={"bold"} />
                        <Text children={user.email} />
                    </HStack>

                    <HStack>
                        <Text children="Created At:" fontWeight={"bold"} />
                        <Text children={user.createdAt.split("T")[0]} />
                    </HStack>

                    {user.role !== "admin" && (
                        <HStack>
                            <Text
                                children="Subscription:"
                                fontWeight={"bold"}
                            />

                            {user.subscription?.status === "active" ? (
                                <Button
                                    isLoading={subscriptionLoading}
                                    color={"yellow.500"}
                                    variant={"ghost"}
                                    onClick={cancelSubscriptionHandler}
                                >
                                    Cancle Subscription
                                </Button>
                            ) : (
                                <Link to="/subscribe">
                                    <Button colorScheme={"yellow"}>
                                        {" "}
                                        Subscribe
                                    </Button>
                                </Link>
                            )}
                        </HStack>
                    )}

                    <Stack direction={["column", "row"]} alignItems={"center"}>
                        <Link to="/updateprofile">
                            <Button>Update Proifile</Button>
                        </Link>

                        <Link to="/changepassword">
                            <Button>Change Password</Button>
                        </Link>
                    </Stack>
                </VStack>
            </Stack>

            <Heading children="Playlist" size={"md"} my={"8"} />
            {user.playlist.length > 0 && (
                <Stack
                    direction={["column", "row"]}
                    alignItems={"center"}
                    flexWrap={"wrap"}
                    p={"4"}
                >
                    {user.playlist.map((element) => (
                        <VStack width={"48"} m={"2"} key={element.course}>
                            <Image
                                boxSize={"full"}
                                objectFit={"contain"}
                                src={element.poster}
                            />

                            <HStack>
                                <Link to={`/course/${element.course}`}>
                                    <Button
                                        variant={"ghost"}
                                        colorScheme="yellow"
                                    >
                                        Watch Now
                                    </Button>
                                </Link>

                                <Button
                                    isLoading={loading}
                                    onClick={() =>
                                        removeFromPlaylistHandler(
                                            element.course
                                        )
                                    }
                                >
                                    <RiDeleteBin7Fill />
                                </Button>
                            </HStack>
                        </VStack>
                    ))}
                </Stack>
            )}

            <ChangePhotoBox
                changeImageSubmitHandler={changeImageSubmitHandler}
                isOpen={isOpen}
                onClose={onClose}
                loading={loading}
            />
        </Container>
    );
};

export default Profile;

function ChangePhotoBox({
    isOpen,
    onClose,
    changeImageSubmitHandler,
    loading,
}) {
    const [imagePrev, setImagePrev] = useState("");

    const [image, setImage] = useState("");

    const changeImage = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    };

    const closeHandler = () => {
        onClose();
        setImagePrev("");
        setImage("");
    };

    return (
        <Modal isOpen={isOpen} onClose={closeHandler}>
            <ModalOverlay backdropFilter={"blur(10px)"} />

            <ModalContent>
                <ModalHeader>Change Photo</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Container>
                        <form
                            onSubmit={(e) => changeImageSubmitHandler(e, image)}
                        >
                            <VStack spacing={"8"}>
                                {imagePrev && (
                                    <Avatar src={imagePrev} boxSize={"40"} />
                                )}

                                <Input
                                    type="file"
                                    css={{
                                        "&::file-selector-button":
                                            FileUploadCss,
                                    }}
                                    onChange={changeImage}
                                />

                                <Button
                                    isLoading={loading}
                                    w={"full"}
                                    colorScheme="yellow"
                                    type="submit"
                                >
                                    Change
                                </Button>
                            </VStack>
                        </form>
                    </Container>
                </ModalBody>

                <ModalFooter>
                    <Button mr={"3"} onClick={closeHandler}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
