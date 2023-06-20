import React, { useState, useEffect } from "react";
import {
    Button,
    Container,
    Grid,
    Heading,
    Image,
    Input,
    Select,
    VStack,
} from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import Sidebar from "../Sidebar";
import { FileUploadCss } from "../../Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import {
    clearAdminError,
    clearAdminMessage,
    createCourse,
} from "../../../redux/features/adminSlice";
import { toast } from "react-toastify";

const CreateCourse = () => {
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.admin);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [imagePrev, setImagePrev] = useState("");

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

    const changeImageHandler = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.append("title", title);
        myForm.append("description", description);
        myForm.append("createdBy", createdBy);
        myForm.append("category", category);
        myForm.append("file", image);

        dispatch(createCourse(myForm));
    };

    useEffect(() => {
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
            <Container py={"16"}>
                <form onSubmit={submitHandler}>
                    <Heading
                        textTransform={"uppercase"}
                        children="Create Course"
                        my={"16"}
                        textAlign={["center", "left"]}
                    />

                    <VStack m={"auto"} spacing={"8"}>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type={"text"}
                            placeholder="Title"
                            focusBorderColor="purple.300"
                        />

                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type={"text"}
                            placeholder="Description"
                            focusBorderColor="purple.300"
                        />

                        <Input
                            value={createdBy}
                            onChange={(e) => setCreatedBy(e.target.value)}
                            type={"text"}
                            placeholder="Creator Name"
                            focusBorderColor="purple.300"
                        />

                        <Select
                            focusBorderColor="purple.300"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Category</option>

                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </Select>

                        <Input
                            required
                            accept="image/*"
                            type="file"
                            focusBorderColor="purple.300"
                            css={{
                                "&::file-selector-button": {
                                    ...FileUploadCss,
                                    color: "purple",
                                },
                            }}
                            onChange={changeImageHandler}
                        />
                        {imagePrev && (
                            <Image
                                src={imagePrev}
                                boxSize={"64"}
                                objectFit={"contain"}
                            />
                        )}

                        <Button
                            isLoading={loading}
                            w={"full"}
                            colorScheme="purple"
                            type="submit"
                        >
                            Create
                        </Button>
                    </VStack>
                </form>
            </Container>

            <Sidebar />
        </Grid>
    );
};

export default CreateCourse;
