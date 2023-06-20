import React, { useEffect, useState } from "react";
import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getSingleCourse } from "../../redux/features/courseSlice";
import Loader from "../Layout/Loader/Loader";

const CoursePage = ({ user }) => {
    const params = useParams();

    const dispatch = useDispatch();
    const [lectureNumber, setLectureNumber] = useState(0);

    const { lectures, loading } = useSelector((state) => state.course);

    useEffect(() => {
        dispatch(getSingleCourse(params.id));
    }, [dispatch, params.id]);

    if (
        user.role !== "admin" &&
        (user.subscription === undefined ||
            user.subscription.status !== "active")
    ) {
        return <Navigate to={"/subscribe"} />;
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Grid minH={"90vh"} templateColumns={["1fr", "3fr 1fr"]}>
                    {lectures?.length > 0 ? (
                        <>
                            <Box>
                                <video
                                    autoPlay
                                    width={"100%"}
                                    controls
                                    controlsList="nodownload noremoteplayback"
                                    disablePictureInPicture
                                    disableRemotePlayback
                                    src={lectures[lectureNumber].video.url}
                                ></video>

                                <Heading
                                    children={`#${lectureNumber + 1} ${
                                        lectures[lectureNumber].title
                                    }`}
                                    m={"4"}
                                />

                                <Heading children="Description" m={"4"} />
                                <Text
                                    children={
                                        lectures[lectureNumber].description
                                    }
                                    m={"4"}
                                />
                            </Box>

                            <VStack>
                                {lectures.map((element, index) => (
                                    <button
                                        onClick={() => setLectureNumber(index)}
                                        key={element._id}
                                        style={{
                                            width: "100%",
                                            padding: "1rem",
                                            margin: 0,
                                            borderBottom:
                                                "1px solid rgba(0,0,0,0.2",
                                        }}
                                    >
                                        <Text noOfLines={1}>
                                            #{index + 1} {element.title}
                                        </Text>
                                    </button>
                                ))}
                            </VStack>
                        </>
                    ) : (
                        <h1>Sorry no video</h1>
                    )}
                </Grid>
            )}
        </>
    );
};

export default CoursePage;
