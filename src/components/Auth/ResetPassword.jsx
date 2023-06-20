import React, { useState } from "react";
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    clearError,
    clearMessage,
    resetUserPassword,
} from "../../redux/features/profileSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const token = params.token;

    const { loading, error, message } = useSelector((state) => state.profile);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(resetUserPassword({ token, password }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        if (message) {
            toast.success(message);
            dispatch(clearMessage());
            navigate("/login");
        }
    }, [dispatch, error, message]);

    return (
        <Container py={"16"} h={"100vh"}>
            <form onSubmit={submitHandler}>
                <Heading
                    children="Reset Password?"
                    my={"16"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                />

                <VStack spacing={"8"}>
                    <Input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your New Password"
                        type="password"
                        focusBorderColor="yellow.500"
                    />

                    <Button
                        isLoading={loading}
                        type="submit"
                        w={"full"}
                        colorScheme="yellow"
                    >
                        Update Password
                    </Button>
                </VStack>
            </form>
        </Container>
    );
};

export default ResetPassword;
