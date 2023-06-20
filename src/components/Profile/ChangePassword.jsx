import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import {
    changeUserPassword,
    clearError,
    clearMessage,
} from "../../redux/features/profileSlice";
import { toast } from "react-toastify";
import { getUserProfile } from "../../redux/features/userSlice";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((state) => state.profile);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(changeUserPassword({ oldPassword, newPassword }));
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
                    children="Change Password"
                    textAlign={["center", "left"]}
                    textTransform={"uppercase"}
                    my={"16"}
                />

                <VStack spacing={"8"}>
                    <Input
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        type={"password"}
                        placeholder="Enter Your Old Passeword"
                        focusBorderColor="yellow.500"
                    />

                    <Input
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type={"password"}
                        placeholder="Enter Your New Passeword"
                        focusBorderColor="yellow.500"
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
    );
};

export default ChangePassword;
