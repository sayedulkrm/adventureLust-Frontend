import React, { useEffect } from "react";
import {
    Box,
    Grid,
    HStack,
    Heading,
    Progress,
    Stack,
    Text,
} from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import Sidebar from "../Sidebar";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { DoughnutChart, LineChart } from "./Chart";
import { useDispatch, useSelector } from "react-redux";
import {
    clearAdminError,
    clearAdminMessage,
    getAdminStats,
} from "../../../redux/features/adminSlice";
import { toast } from "react-toastify";
import Loader from "../../Layout/Loader/Loader";

const Databox = ({ title, qty, qtyPercentage, profit }) => {
    return (
        <Box
            w={["full", "25%"]}
            boxShadow={"-2px 0 10px rgba(107,70,193, 0.5)"}
            p={"8"}
            borderRadius={"lg"}
        >
            <Text children={title} />

            <HStack spacing={"16"}>
                <Text fontSize={"2xl"} fontWeight={"bold"} children={qty} />

                <HStack>
                    <Text children={`${qtyPercentage}%`} />
                    {profit ? (
                        <RiArrowUpLine color="green" />
                    ) : (
                        <RiArrowDownLine color="red" />
                    )}
                </HStack>
            </HStack>

            <Text opacity={0.6} children="Sience Last Month" />
        </Box>
    );
};

const Bar = ({ title, value, profit }) => {
    return (
        <Box py={"4"} px={["0", "20"]}>
            <Heading size={"sm"} children={title} mb={"2"} />

            <HStack w={"full"} alignItems={"center"}>
                <Text children={profit ? "0%" : `-${value}%`} />
                <Progress
                    w={"full"}
                    value={profit ? value : 0}
                    colorScheme="purple"
                />

                <Text children={`${value > 100 ? value : 100}%`} />
            </HStack>
        </Box>
    );
};

const Dashboard = () => {
    const dispatch = useDispatch();

    const {
        loading,
        error,
        message,
        stats,
        usersCount,
        subscriptionCount,
        viewsCount,
        usersPercentage,
        usersProfit,
        viewsPercentage,
        viewsProfit,
        subscriptionProfit,
        subscriptionPercentage,
    } = useSelector((state) => state.admin);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAdminError());
        }

        if (message) {
            toast.success(message);
            dispatch(clearAdminMessage());
        }

        dispatch(getAdminStats());
    }, [dispatch, error, message]);

    return (
        <Grid
            minH={"100vh"}
            templateColumns={["1fr", "5fr 1fr"]}
            css={{
                cursor: `url(${cursor}), default`,
            }}
        >
            {loading || !stats ? (
                <Loader color="purple.500" />
            ) : (
                <Box boxSizing="border-box" py={"16"} px={["4", "0"]}>
                    {stats.length > 11 && stats[11].createdAt && (
                        <Text
                            textAlign={"center"}
                            opacity={0.5}
                            children={`Last Changes on ${
                                String(new Date(stats[11].createdAt)).split(
                                    "G"
                                )[0]
                            }`}
                        />
                    )}

                    <Heading
                        children="Dashboard"
                        ml={["0", "16"]}
                        mb={"16"}
                        textAlign={["center", "left"]}
                    />

                    <Stack
                        direction={["column", "row"]}
                        minH={"24"}
                        justifyContent={"space-evenly"}
                    >
                        <Databox
                            title="Views"
                            qty={viewsCount}
                            qtyPercentage={viewsPercentage}
                            profit={viewsProfit}
                        />
                        <Databox
                            title="Users"
                            qty={usersCount}
                            qtyPercentage={usersPercentage}
                            profit={usersProfit}
                        />
                        <Databox
                            title="Subscription"
                            qty={subscriptionCount}
                            qtyPercentage={subscriptionPercentage}
                            profit={subscriptionProfit}
                        />
                    </Stack>

                    <Box
                        m={["0", "16"]}
                        borderRadius={"lg"}
                        p={["0", "16"]}
                        mt={["4", "16"]}
                        boxShadow={"-2px 0 10px rgba(107,70,193, 0.5)"}
                    >
                        <Heading
                            textAlign={["center", "left"]}
                            size={"md"}
                            children="Views Graph"
                            pt={["8", "0"]}
                            ml={["0", "16"]}
                        />

                        {/* Line Graph Here */}

                        <LineChart dataArray={stats} />
                    </Box>

                    <Grid templateColumns={["1fr", "2fr 1fr"]}>
                        <Box p={"4"}>
                            <Heading
                                textAlign={["center", "left"]}
                                size={"md"}
                                children="Progress Bar"
                                my={"8"}
                                ml={["0", "16"]}
                            />
                            <Box>
                                <Bar
                                    profit={viewsProfit}
                                    title="Views"
                                    value={viewsPercentage}
                                />
                                <Bar
                                    profit={usersProfit}
                                    title="Users"
                                    value={usersPercentage}
                                />
                                <Bar
                                    profit={subscriptionProfit}
                                    title="Subscription"
                                    value={subscriptionPercentage}
                                />
                            </Box>
                        </Box>

                        <Box p={["0", "16"]} boxSizing="border-box" py={"4"}>
                            <Heading
                                textAlign={"center"}
                                size={"md"}
                                mb="4"
                                children="Users"
                            />

                            {/* Dougnut Graph */}

                            <DoughnutChart
                                usersSubscriptionDetails={[
                                    subscriptionCount,
                                    usersCount - subscriptionCount,
                                ]}
                            />
                        </Box>
                    </Grid>
                </Box>
            )}
            <Sidebar />
        </Grid>
    );
};

export default Dashboard;
