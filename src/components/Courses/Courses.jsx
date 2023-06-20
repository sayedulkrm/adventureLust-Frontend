import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    HStack,
    Heading,
    Image,
    Input,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    addToPlaylist,
    clearError,
    clearMessage,
    getAllCourses,
} from "../../redux/features/courseSlice";
import { toast } from "react-toastify";
import { getUserProfile } from "../../redux/features/userSlice";

const CourseCard = ({
    views,
    title,
    imageSrc,
    id,
    addToPlayListHandler,
    creator,
    description,
    count,
    loading,
}) => {
    return (
        <>
            <VStack className="course" alignItems={["center", "flex-start"]}>
                <Image src={imageSrc} boxSize={60} objectFit={"contain"} />
                <Heading
                    textAlign={["center", "left"]}
                    maxWidth={"200px"}
                    fontFamily={"sans-serif"}
                    noOfLines={3}
                    children={title}
                    size={"sm"}
                />
                <Text noOfLines={2} children={description} />

                <HStack>
                    <Text
                        fontWeight={"bold"}
                        textTransform={"uppercase"}
                        children={`Creator :`}
                    />

                    <Text
                        fontFamily={"body"}
                        textTransform={"uppercase"}
                        children={creator}
                    />
                </HStack>

                <Heading
                    textAlign={"center"}
                    size={"xs"}
                    children={`Videos - ${count}`}
                    textTransform={"uppercase"}
                />

                <Heading
                    size={"xs"}
                    children={`Views - ${views}`}
                    textTransform={"uppercase"}
                />

                <Stack direction={["column", "row"]} alignItems={"center"}>
                    <Link to={`/course/${id}`}>
                        <Button colorScheme={"yellow"}>Watch Now</Button>
                    </Link>

                    <Button
                        isLoading={loading}
                        variant={"ghost"}
                        colorScheme={"yellow"}
                        onClick={() => addToPlayListHandler(id)}
                    >
                        Add To Playlist
                    </Button>
                </Stack>
            </VStack>
        </>
    );
};

const Courses = () => {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");

    const dispatch = useDispatch();

    const { loading, courses, error, message } = useSelector(
        (state) => state.course
    );

    const addToPlayListHandler = async (courseId) => {
        await dispatch(addToPlaylist(courseId));
        dispatch(getUserProfile());
    };

    const categories = [
        "Cultural Immersion",
        "Adventure Sports",
        "Wildlife Safaris",
        "Culinary Tours",
        "History and Heritage",
        "Nature and Eco-Tourism",
        "Beach and Island Escapes",
        "Photography Tours",
        "Solo and Budget Travel",
        "Luxury and Comfort Tours",
    ];

    useEffect(() => {
        dispatch(getAllCourses({ category, keyword }));

        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        if (message) {
            toast.done(message);
            dispatch(clearMessage());
        }
    }, [category, keyword, dispatch, error, message]);

    return (
        <Container minH={"95vh"} maxW={"container.lg"} paddingY={"8"}>
            <Heading
                children="Explore Our Exciting Travel Courses and Find Your Next Adventure"
                m={"8"}
                textAlign={"center"}
            />

            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search..."
                type="text"
                focusBorderColor="yellow.500"
            />

            <HStack
                overflowX={"auto"}
                paddingY={"8"}
                css={{
                    "&::-webkit-scrollbar": {
                        width: "10px",
                        height: "10px",

                        borderRadius: "10px",
                        border: "1px solid #555555",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#ecc94b",
                        border: "1px solid #555555",
                        borderRadius: "10px",
                    },
                }}
            >
                {categories.map((item, index) => (
                    <Button
                        key={index}
                        onClick={() => setCategory(item)}
                        minW={"60"}
                    >
                        <Text children={item} />
                    </Button>
                ))}
            </HStack>

            <Stack
                direction={["column", "row"]}
                flexWrap={"wrap"}
                justifyContent={["flex-start", "space-evenly"]}
                alignItems={["center", "flex-start"]}
            >
                {courses.length > 0 ? (
                    courses.map((item) => {
                        const {
                            _id,
                            title,
                            poster,
                            createdBy,
                            description,
                            numOfVideos,
                            views,
                        } = item;

                        return (
                            <CourseCard
                                key={_id}
                                title={title}
                                description={description}
                                views={views}
                                imageSrc={poster.url}
                                id={_id}
                                creator={createdBy}
                                count={numOfVideos}
                                addToPlayListHandler={addToPlayListHandler}
                                loading={loading}
                            />
                        );
                    })
                ) : (
                    <Heading
                        opacity={0.8}
                        mt={"4"}
                        children="No Courses Found"
                    />
                )}
            </Stack>
        </Container>
    );
};

export default Courses;
