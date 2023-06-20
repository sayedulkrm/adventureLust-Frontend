import React, { useState } from "react";
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearError,
    clearMessage,
    forgetUserPassword,
} from "../../redux/features/profileSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    const { loading, error, message } = useSelector((state) => state.profile);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(forgetUserPassword({ email }));
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
        <Container py={"16"} h={"100vh"}>
            <form onSubmit={submitHandler}>
                <Heading
                    children="Forget Password?"
                    my={"16"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                />

                <VStack spacing={"8"}>
                    <Input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                        type="email"
                        focusBorderColor="yellow.500"
                    />

                    <Button
                        isLoading={loading}
                        type="submit"
                        w={"full"}
                        colorScheme="yellow"
                    >
                        Send Reset Link
                    </Button>
                </VStack>
            </form>
        </Container>
    );
};

export default ForgetPassword;
