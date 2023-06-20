import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    FormLabel,
    Heading,
    Input,
    Textarea,
    VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    clearOtherError,
    clearOtherMessage,
    contactUs,
} from "../../redux/features/otherSlice";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const { loading, error, otherMessage } = useSelector(
        (state) => state.other
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(contactUs({ name, email, message }));
        setName("");
        setEmail("");
        setMessage("");
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearOtherError());
        }

        if (otherMessage) {
            toast.success(otherMessage);
            dispatch(clearOtherMessage());
        }
    }, [dispatch, error, otherMessage]);

    return (
        <Container h={"100vh"}>
            <VStack h={"full"} justifyContent={"center"} spacing={16}>
                <Heading children="Contact Us" />

                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                    <Box marginY={"4"}>
                        <FormLabel htmlFor="name" children="Name" />
                        <Input
                            required
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Your Name"
                            type="text"
                            focusBorderColor="yellow.500"
                        />
                    </Box>

                    <Box marginY={"4"}>
                        <FormLabel htmlFor="email" children="Email Address" />
                        <Input
                            required
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Your Email"
                            type="email"
                            focusBorderColor="yellow.500"
                        />
                    </Box>

                    <Box marginY={"4"}>
                        <FormLabel
                            htmlFor="message"
                            children="Always happy to hear from you"
                        />
                        <Textarea
                            required
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter Your Message..."
                            focusBorderColor="yellow.500"
                        />
                    </Box>

                    <Button
                        my={"4"}
                        colorScheme="yellow"
                        type="submit"
                        isLoading={loading}
                    >
                        Send
                    </Button>

                    <Box my={"4"}>
                        Request for a Course?{" "}
                        <Link to="/request">
                            {" "}
                            <Button colorScheme="yellow" variant={"link"}>
                                Click
                            </Button>{" "}
                            here!
                        </Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    );
};

export default Contact;
