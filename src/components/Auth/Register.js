import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    FormLabel,
    Heading,
    Input,
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../../redux/features/userSlice";

export const FileUploadCss = {
    cursor: "pointer",
    marginLeft: "-5%",
    width: "110%",
    border: "none",
    height: "100%",
    color: "#ECC94B",
    backgroundColor: "transparent",
};

const FileUploadStyle = {
    "&::file-selector-button": FileUploadCss,
};

const Register = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imagePrev, setImagePrev] = useState("");

    const [image, setImage] = useState("");

    const changeImageHandler = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("file", image);

        dispatch(userRegister(myForm));
    };

    return (
        <Container h={"100%"}>
            <VStack
                h={"full"}
                justifyContent={"center"}
                spacing={"10"}
                marginTop={"10"}
            >
                <Heading
                    textAlign={"center"}
                    children="Wanderlust Adventures"
                />
                <Heading
                    textAlign={"center"}
                    textTransform={"uppercase"}
                    children="Registration"
                />

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Box my={"0"} display={"flex"} justifyContent={"center"}>
                        <Avatar src={imagePrev} size={"2xl"} />
                    </Box>

                    <Box marginY={"4"}>
                        <FormLabel htmlFor="name" children="Name" />
                        <Input
                            required
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jhon Doe"
                            type="name"
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
                        <FormLabel htmlFor="password" children="Password" />
                        <Input
                            required
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Your Password"
                            type="password"
                            focusBorderColor="yellow.500"
                        />
                    </Box>

                    <Box marginY={"4"}>
                        <FormLabel
                            htmlFor="chooseAvatar"
                            children="Choose Avatar"
                        />
                        <Input
                            required
                            id="chooseAvatar"
                            accept="image/*"
                            type="file"
                            focusBorderColor="yellow.500"
                            css={FileUploadStyle}
                            onChange={changeImageHandler}
                        />
                    </Box>

                    <Button my={"4"} colorScheme="yellow" type="submit">
                        Sign Up
                    </Button>

                    <Box my={"4"}>
                        Already Sign Up?{" "}
                        <Link to="/login">
                            {" "}
                            <Button colorScheme="yellow" variant={"link"}>
                                Login
                            </Button>{" "}
                            here!
                        </Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    );
};

export default Register;
