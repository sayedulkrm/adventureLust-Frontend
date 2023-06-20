import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    HStack,
    Heading,
    Image,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import Sidebar from "../Sidebar";
import { RiDeleteBin7Fill } from "react-icons/ri";
import CourseModal from "./CourseModal";
import { useDispatch, useSelector } from "react-redux";
import {
    clearError,
    clearMessage,
    getAllCourses,
    getSingleCourse,
} from "../../../redux/features/courseSlice";
import {
    addLecture,
    clearAdminError,
    clearAdminMessage,
    deleteCourse,
    deleteLecture,
} from "../../../redux/features/adminSlice";
import { toast } from "react-toastify";

const AdminCourses = () => {
    const dispatch = useDispatch();
    const { courses, lectures } = useSelector((state) => state.course);

    const { loading, error, message } = useSelector((state) => state.admin);

    const [courseID, setCourseID] = useState("");
    const [courseTitle, setCourseTitle] = useState("");

    const { isOpen, onClose, onOpen } = useDisclosure();

    const courseDetailsHandler = (courseId, title) => {
        dispatch(getSingleCourse(courseId));
        onOpen();
        setCourseID(courseId);
        setCourseTitle(title);
    };

    const deleteButtonHandler = (courseId) => {
        console.log(courseId);
        dispatch(deleteCourse(courseId));
    };

    const deleteLectureButtonHandler = async (courseId, lectureId) => {
        await dispatch(deleteLecture({ courseId, lectureId }));
        dispatch(getSingleCourse(courseId));
    };

    const addLectureHandler = async (
        e,
        courseId,
        title,
        description,
        video
    ) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.append("title", title);
        myForm.append("description", description);

        myForm.append("file", video);

        await dispatch(addLecture({ courseId, myForm }));
        dispatch(getSingleCourse(courseId));
    };

    useEffect(() => {
        dispatch(getAllCourses({ category: "", keyword: "" }));

        if (error) {
            toast.error(error);
            dispatch(clearAdminError());
        }

        if (message) {
            toast.success(message);
            dispatch(clearAdminMessage());
        }
    }, [dispatch, error, message]);

    return (
        <Grid
            minH={"100vh"}
            templateColumns={["1fr", "5fr 1fr"]}
            css={{
                cursor: `url(${cursor}), default`,
            }}
        >
            <Box p={["0", "8"]} overflowX={"auto"}>
                <Heading
                    textTransform={"uppercase"}
                    children="All Courses"
                    my={"16"}
                    textAlign={["center", "left"]}
                />

                <TableContainer w={["100vw", "full"]}>
                    <Table variant={"simple"} size={"lg"}>
                        <TableCaption>
                            All Avalable courses in the database
                        </TableCaption>

                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Poster</Th>
                                <Th>Title</Th>
                                <Th>Category</Th>
                                <Th>Creator</Th>

                                <Th isNumeric>Views</Th>
                                <Th isNumeric>Lectures</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {courses?.map((item) => (
                                <Row
                                    courseDetailsHandler={courseDetailsHandler}
                                    deleteButtonHandler={deleteButtonHandler}
                                    key={item._id}
                                    item={item}
                                    loading={loading}
                                />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>

                <CourseModal
                    isOpen={isOpen}
                    onClose={onClose}
                    id={courseID}
                    courseTitle={courseTitle}
                    deleteButtonHandler={deleteLectureButtonHandler}
                    addLectureHandler={addLectureHandler}
                    lectures={lectures}
                    loading={loading}
                />
            </Box>

            <Sidebar />
        </Grid>
    );
};

function Row({ item, courseDetailsHandler, deleteButtonHandler, loading }) {
    return (
        <Tr>
            <Td>#{item._id}</Td>

            <Td>
                <Image src={item.poster.url} />
            </Td>

            <Td>{item.title}</Td>
            <Td textTransform={"uppercase"}>{item.category}</Td>
            <Td>{item.createdBy}</Td>

            <Td isNumeric>{item.views}</Td>
            <Td isNumeric>{item.numOfVideos}</Td>

            <Td isNumeric>
                <HStack justifyContent={"flex-end"}>
                    <Button
                        onClick={() =>
                            courseDetailsHandler(item._id, item.title)
                        }
                        variant={"outline"}
                        color={"purple.500"}
                        isLoading={loading}
                    >
                        View Lecture
                    </Button>

                    <Button
                        onClick={() => deleteButtonHandler(item._id)}
                        color={"purple.600"}
                        isLoading={loading}
                    >
                        <RiDeleteBin7Fill />
                    </Button>
                </HStack>
            </Td>
        </Tr>
    );
}

export default AdminCourses;
