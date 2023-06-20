import React, { useEffect } from "react";
import {
    Box,
    Button,
    Grid,
    HStack,
    Heading,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import Sidebar from "../Sidebar";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
    clearAdminError,
    clearAdminMessage,
    deleteUser,
    getAllUsers,
    updateUserRole,
} from "../../../redux/features/adminSlice";

import Loader from "../../Layout/Loader/Loader";
import { toast } from "react-toastify";

const Users = () => {
    const dispatch = useDispatch();

    const { users, loading, message, error } = useSelector(
        (state) => state.admin
    );

    // const users = [
    //   {
    //     _id: '41244',
    //     name: 'Bruce Wayne',
    //     email: 'zzx@xml.com',
    //     role: 'user',
    //     subscription: {
    //       status: 'active',
    //     },
    //   },
    // ];

    const updateHandler = (userId) => {
        console.log(userId);
        dispatch(updateUserRole(userId));
    };

    const deleteButtonHandler = (userId) => {
        console.log(userId);
        dispatch(deleteUser(userId));
    };

    useEffect(() => {
        dispatch(getAllUsers());

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
            <Box p={["0", "16"]} overflowX={"auto"}>
                <Heading
                    textTransform={"uppercase"}
                    children="All Users"
                    my={"16"}
                    textAlign={["center", "left"]}
                />

                <TableContainer w={["100vw", "full"]}>
                    <Table variant={"simple"} size={"lg"}>
                        <TableCaption>
                            All Avalable users in the database
                        </TableCaption>

                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Subscription</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {users ? (
                                users.map((item) => (
                                    <Row
                                        updateHandler={updateHandler}
                                        deleteButtonHandler={
                                            deleteButtonHandler
                                        }
                                        key={item._id}
                                        item={item}
                                        loading={loading}
                                    />
                                ))
                            ) : (
                                <Heading children={"No Users"} />
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            <Sidebar />
        </Grid>
    );
};
export default Users;

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
    return (
        <Tr>
            <Td>#{item._id}</Td>
            <Td>{item.name}</Td>
            <Td>{item.email}</Td>
            <Td>{item.role}</Td>
            <Td>
                {item.subscription?.status === "active"
                    ? "Active"
                    : "Not Active"}
            </Td>

            <Td isNumeric>
                <HStack justifyContent={"flex-end"}>
                    <Button
                        onClick={() => updateHandler(item._id)}
                        variant={"outline"}
                        color={"purple.500"}
                        isLoading={loading}
                    >
                        Change Role
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
