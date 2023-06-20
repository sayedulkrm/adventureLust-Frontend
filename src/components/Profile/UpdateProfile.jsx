import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import {
    clearError,
    clearMessage,
    userProfileUpdate,
} from "../../redux/features/profileSlice";
import { getUserProfile } from "../../redux/features/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UpdateProfile = ({ user }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, message, error } = useSelector((state) => state.profile);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(userProfileUpdate({ name, email }));

        dispatch(getUserProfile());
        navigate("/profile");
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
    }, [dispatch, error, message]);

    return (
        <Container py={"16"} minH={"100vh"}>
            <form onSubmit={handleSubmit}>
                <Heading
                    children="Update Profile"
                    textAlign={["center", "left"]}
                    textTransform={"uppercase"}
                    my={"16"}
                />

                <VStack spacing={"8"}>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type={"text"}
                        placeholder="Name"
                        focusBorderColor="yellow.500"
                    />

                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type={"email"}
                        placeholder="Email"
                        focusBorderColor="yellow.500"
                    />

                    <Button
                        isLoading={loading}
                        w={"full"}
                        colorScheme="yellow"
                        type="submit"
                    >
                        Update
                    </Button>
                </VStack>
            </form>
        </Container>
    );
};

export default UpdateProfile;
