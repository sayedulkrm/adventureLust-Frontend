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
import {
    clearOtherError,
    clearOtherMessage,
    requestCourse,
} from "../../redux/features/otherSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Request = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");

    const dispatch = useDispatch();

    const { loading, error, otherMessage } = useSelector(
        (state) => state.other
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(requestCourse({ name, email, course }));
        setName("");
        setEmail("");
        setCourse("");
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
            <VStack h={"full"} justifyContent={"center"} spacing={10}>
                <Heading children=" Request a Course Today!" />

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
                            htmlFor="course"
                            children="Explain the course"
                        />
                        <Textarea
                            required
                            id="course"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            placeholder="Tell us about your travel interests and what you hope to learn from our courses!"
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
                        See avalable Courses!{" "}
                        <Link to="/courses">
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

export default Request;
