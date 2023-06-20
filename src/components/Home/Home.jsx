import React from "react";
import "./Home.css";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    Divider,
    HStack,
    Heading,
    Image,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { DiAws } from "react-icons/di";

import { Link } from "react-router-dom";

import vg from "../../assets/images/hero.png";
import sus from "../../assets/images/bg.png";
import introVideo from "../../assets/videos/Intro.mp4";

const Home = () => {
    return (
        <section className="home">
            <div className="container">
                <Stack
                    direction={["column", "row"]}
                    height="100%"
                    justifyContent={["center", "space-between"]}
                    alignItems={"center"}
                    spacing={["16", "56"]}
                >
                    <VStack
                        width={"full"}
                        alignItems={["center", "flex-end"]}
                        spacing={"5"}
                    >
                        <Heading
                            textAlign={["center", "left"]}
                            children="Discover New Cultures. Explore the World."
                            size={"xl"}
                        />
                        <Text
                            textAlign={["center", "left"]}
                            children="We guarantee you'll have an unforgettable experience with our travel courses."
                            fontSize={"lg"}
                            fontFamily={"cursive"}
                        />

                        <Link to="/courses">
                            <Button size={"lg"} colorScheme="yellow">
                                Explore Now
                            </Button>
                        </Link>
                    </VStack>

                    <Image
                        className="vector-graphics"
                        boxSize={"md"}
                        src={vg}
                        objectFit={"contain"}
                    />
                </Stack>
            </div>

            <Box padding={"8"} bg={"blackAlpha.800"}>
                <Heading
                    children="Meet Our Clients"
                    textAlign={"center"}
                    fontFamily={"body"}
                    color={"yellow.400"}
                />

                <HStack
                    className="brandsBanner"
                    justifyContent={"space-evenly"}
                    marginTop={4}
                >
                    <CgGoogle />
                    <CgYoutube />
                    <SiCoursera />
                    <SiUdemy />
                    <DiAws />
                </HStack>
            </Box>

            <div className="container2">
                <video
                    autoPlay={false}
                    controls
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                    src={introVideo}
                ></video>
            </div>

            <Box p={"8"} my={8} bg={"blackAlpha.800"}>
                <Heading
                    mb={8}
                    textAlign={"center"}
                    color={"yellow.400"}
                    children="What people say about us !"
                />
                <Stack
                    direction={["column", "row"]}
                    justifyContent={"space-around"}
                    spacing={["5", "5"]}
                    fontStyle={"italic"}
                    py={["3", "8"]}
                >
                    <Card maxW={"md"}>
                        <CardBody p={["4", "8"]}>
                            <Text>
                                Great course. Great instruction. Pleasant.
                                Practical. Easy to understand. Friendly.
                                Motivational. Useful on all accounts. Only
                                problem was an inability to open the download
                                files for the course.
                            </Text>

                            <HStack
                                justifyContent={"space-around"}
                                alignItems={"center"}
                                mt={4}
                                spacing={5}
                            >
                                <Heading size={"md"} children="Eric Watson" />
                                <Avatar size={"md"} />
                            </HStack>
                        </CardBody>
                    </Card>

                    <Card maxW={"md"}>
                        <CardBody p={8}>
                            <Text>
                                Really interesting and useful course! The
                                instructor did a great job putting together a
                                very engaging and logically structured series of
                                lectures. I got a ton out of this, and I'd
                                highly recommend getting his Travel Publishing
                                course too.
                            </Text>

                            <HStack
                                justifyContent={"space-around"}
                                alignItems={"center"}
                                mt={4}
                                spacing={5}
                            >
                                <Heading size={"md"} children="Alex Warner" />
                                <Avatar size={"md"} />
                            </HStack>
                        </CardBody>
                    </Card>

                    <Card maxW={"md"}>
                        <CardBody p={8}>
                            <Text>
                                It's too conceptual and there isn't enough
                                practical examples on how to execute the
                                concepts. I feel that it's too short and that at
                                least 40% is promoting the teacher and the
                                content is left out.
                            </Text>

                            <HStack
                                justifyContent={"space-around"}
                                alignItems={"center"}
                                mt={4}
                                spacing={5}
                            >
                                <Heading size={"md"} children="Kim K." />
                                <Avatar size={"md"} />
                            </HStack>
                        </CardBody>
                    </Card>
                </Stack>
            </Box>

            <div className="container">
                <Stack
                    direction={["column", "row"]}
                    height="100%"
                    justifyContent={["center", "space-between"]}
                    alignItems={"center"}
                    spacing={["16", "56"]}
                >
                    <Image
                        className="vector-graphics"
                        boxSize={"md"}
                        src={sus}
                        objectFit={"contain"}
                    />

                    <VStack
                        width={"full"}
                        alignItems={["center", "flex-start"]}
                        spacing={"6"}
                    >
                        <Heading
                            textAlign={["center", "left"]}
                            children="Subscribe Today !"
                            textTransform={"uppercase"}
                            size={"xl"}
                        />
                        <Text
                            textAlign={["center", "left"]}
                            children="We guarantee you'll have an unforgettable experience with our travel courses."
                            fontSize={"lg"}
                            fontFamily={"cursive"}
                        />

                        <Link to="/subscribe">
                            <Button size={"lg"} colorScheme="yellow">
                                Subscribe Now
                            </Button>
                        </Link>
                    </VStack>
                </Stack>
            </div>
        </section>
    );
};

export default Home;
