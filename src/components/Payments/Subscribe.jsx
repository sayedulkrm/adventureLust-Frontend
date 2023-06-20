import React from "react";
import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

import logo from "../../assets/images/logo.png";

import { server } from "../../url";
import {
    buySubscription,
    clearError,
    clearMessage,
} from "../../redux/features/subscriptionSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { clearError as courseClearError } from "../../redux/features/courseSlice";

const Subscribe = ({ user }) => {
    const [key, setKey] = useState("");

    const dispatch = useDispatch();

    const { loading, error, subscriptionId, message } = useSelector(
        (state) => state.subscription
    );

    const { error: courserError } = useSelector((state) => state.course);

    const subscribeHandler = async () => {
        const { data } = await axios.get(`${server}/razorpaykey`);

        setKey(data.key);
        dispatch(buySubscription());
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        if (courserError) {
            toast.error(courserError);
            dispatch(courseClearError());
        }

        if (message) {
            toast.success(message);
            dispatch(clearMessage());
        }

        if (subscriptionId) {
            const openPopUp = () => {
                const options = {
                    key,
                    name: "Wanderlust Adventure",
                    discription: "GET ACCESS TO ALL PREMIUM CONTENT",
                    image: logo,
                    subscription_id: subscriptionId,
                    callback_url: `${server}/paymentverification`,
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: "",
                    },
                    notes: {
                        address: "Wanderlust Adventure ",
                    },
                    theme: {
                        color: "#FFC800",
                    },
                };

                const razor = new window.Razorpay(options);
                razor.open();
            };

            openPopUp();
        }
    }, [
        error,
        courserError,
        message,
        dispatch,
        subscriptionId,
        key,
        user.name,
        user.email,
    ]);

    return (
        <Container h={"100vh"} padding={"16"}>
            <Heading children="Let's Start" my={"8"} textAlign={"center"} />
            <VStack
                boxShadow={"lg"}
                alignItems={"stretch"}
                borderRadius={"lg"}
                spacing={0}
            >
                <Box
                    bg={"yellow.400"}
                    p={"4"}
                    css={{
                        borderRadius: "8px 8px 0 0",
                    }}
                >
                    <Text children={`Pro Pack - $3.00`} color={"black"} />
                </Box>

                <Box p={"4"}>
                    <VStack
                        textAlign={"center"}
                        px={"8"}
                        mt={"4"}
                        spacing={"8"}
                    >
                        <Text
                            children={`Join Pro Pack and Get Access to All Content`}
                        />
                        <Heading size={"md"} children={`$3.00 Only`} />
                    </VStack>

                    <Button
                        my={"8"}
                        w={"full"}
                        colorScheme="yellow"
                        onClick={subscribeHandler}
                        isLoading={loading}
                    >
                        Buy Now
                    </Button>
                </Box>

                <Box
                    bg={"blackAlpha.600"}
                    p={"4"}
                    css={{
                        borderRadius: " 0 0 8px 8px",
                    }}
                >
                    <Heading
                        color={"white"}
                        textTransform={"uppercase"}
                        size={"sm"}
                        children={`100% refund at cancellation`}
                    />

                    <Text
                        fontSize={"xs"}
                        color={"white"}
                        children={"*Terms and Condition Apply"}
                    />
                </Box>
            </VStack>
        </Container>
    );
};

export default Subscribe;
