import { isHtmlEmpty } from "../../../../../config/helper";
import moment from "moment";
import {
    Document,
    Page,
    Text,
    StyleSheet,
    View,
    Image,
    Font
} from "@react-pdf/renderer";
import font from "../../../../../font/Poppins-Medium.ttf";


Font.register({
    family: "Poppins",
    src: font,
});


// central layout & typography constants for consistent look across all pages
const PAGE_PADDING = 35;
const TYPOGRAPHY = {
    title: 18,
    section: 14,
    subsection: 16,
    smallHeader: 10,
    body: 10,
    small: 8,
};

const styles = StyleSheet.create({
    // Base page used for most pages so padding/width stays consistent
      pageBase: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        paddingTop: 50,
        paddingBottom: PAGE_PADDING,
        paddingLeft: PAGE_PADDING,
        paddingRight: PAGE_PADDING,
        fontFamily: "Poppins",
    },


    // A slightly different layout for the first cover page
    coverPage: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        paddingTop: PAGE_PADDING,
        paddingBottom: PAGE_PADDING,
        paddingLeft: PAGE_PADDING,
        paddingRight: PAGE_PADDING,
    },

    headerContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
    },

    pageStarter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 5,
        position: "absolute",
        width: "100%",
        top: 10,
        left: PAGE_PADDING,
        right: PAGE_PADDING,
        marginBottom: 15
    },

    pageFooter: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 5,
        position: "absolute",
        bottom: 5, // distance from bottom
        left: 20,
        right: 20,
    },

    flexWrapper: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 5,
    },
    // Logo sizing — keep small and consistent
    logo: {
        width: 100,
        marginBottom: 10,
    },

    // Primary title with background color (keeps your previous look)
    reportBanner: {
        fontSize: TYPOGRAPHY.title,
        fontWeight: "bold",
        color: "#FFFFFF",
        backgroundColor: "#0a7386",
        padding: 10,
        textAlign: "center",
        marginTop: 5
    },

    reportName: {
        textAlign: "center",
        marginTop: 6,
        fontSize: TYPOGRAPHY.section,
    },

    // Contents / small headings
    contentsHeading: {
        marginBottom: 12,
        color: "#0a7386",
        fontSize: TYPOGRAPHY.section,
        fontWeight: "bold",
    },

    // Section title (e.g., Executive Summary, Audit Purpose)
    sectionTitle: {
        fontSize: TYPOGRAPHY.section,
        color: "#0a7386",
        marginBottom: 8,
    },

    // Sub-location label (bold so user can quickly scan)
    subLocationLabel: {
        fontSize: TYPOGRAPHY.subsection,
        color: "#0a7386",
        fontWeight: "bold",
    },

    // Area label (bold to visually separate groups)
    areaLabel: {
        fontSize: TYPOGRAPHY.subsection,
        color: "#0a7386",
        fontWeight: "bold",
        marginTop: 6,
        marginBottom: 4,
    },

    // Small header inside summary blocks
    smallHeader: {
        fontSize: TYPOGRAPHY.smallHeader,
        fontWeight: "bold",
    },
    resourcesWrapper: {
        fontSize: TYPOGRAPHY.smallHeader,
        fontWeight: "bold",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },

    // Body paragraph styling
    bodyText: {
        fontSize: TYPOGRAPHY.body,
        lineHeight: 1.3,
    },

    // smaller paragraph
    smallText: {
        fontSize: TYPOGRAPHY.small,
    },

    // general wrapper for blocks of content
    contentBlock: {
        flexDirection: "column",
        gap: 6,
        marginBottom: 8,
    },

    // thin divider line
    divider: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        borderBottomStyle: "solid",
    },

    // find-list wrapper
    findingsList: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        marginTop: 12,
    },

    // small meta text used at the top of pages
    smallMeta: {
        fontSize: TYPOGRAPHY.small,
    },

    // page numbering (keeps number centered at the bottom)
    pageNumber: {
        position: "absolute",
        bottom: 3,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 10,
        padding: 3,
    },

    // utility for location wrap (keeps sub-location and any chips in row)
    locationRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "center",
    },

    // used for blocks that repeat inside each observation
    observationBlock: {
        flexDirection: "column",
        gap: 6,
        marginBottom: 6,
    },
});

const InternalAuditReportPDF = ({ reportObject, logoPreview, groupedObservations, data }) => {

    return (
        <Document>
            {/* Cover / First Page */}
            <Page style={styles.coverPage} size="A4">
                <View style={styles.headerContainer}>
                    <Image src={logoPreview} style={styles.logo} />
                </View>

                <View>
                    <Text style={styles.reportBanner}>Internal Audit Report</Text>
                </View>

                <View style={{ marginTop: 8 }}>
                    <Text style={styles.reportName}>{reportObject?.reportName}</Text>
                </View>

                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>

            {/* Main content pages*/}
            <Page size="A4" style={styles.pageBase} wrap>
                {/* Top header */}
                <View style={styles.pageStarter} fixed>
                    <Text style={styles.smallMeta}>{reportObject?.reportName}</Text>
                    <Image src={logoPreview} style={{ width: 40 }} />
                </View>

                {/* Contents / Table of contents */}
                <View >
                    <Text style={styles.contentsHeading}>Contents</Text>
                    <View style={styles.contentBlock}>
                        <Text style={styles.smallHeader}>01 - Executive Summary</Text>
                        <Text style={styles.smallHeader}>02 - Identification</Text>
                        <Text style={styles.smallHeader}>03 - Financial & Operational Key Figures</Text>
                        <Text style={styles.smallHeader}>04 - Summary of Main Findings</Text>
                        <Text style={styles.smallHeader}>05 - Main Findings & Recommendation</Text>
                        {reportObject?.intAuditExtraFieldsList?.length > 0 && (
                            <Text style={styles.smallHeader}>06 - Audit Extra Fields</Text>
                        )}

                        {!isHtmlEmpty(reportObject.annexure) && (
                            <Text style={styles.smallHeader}>
                                {reportObject?.intAuditExtraFieldsList?.length > 0 ? "07" : "06"} - Annexure
                            </Text>
                        )}

                    </View>
                </View>

                {/* Executive Summary */}
                <View break>
                    <Text style={styles.sectionTitle}>Executive Summary</Text>

                    {data.executiveSummary.map((img, idx) => (
                        <Image src={img} key={idx} />
                    ))}
                </View>

                {/* Overview */}
                <View break>
                    <Text style={styles.contentsHeading}>Identification</Text>

                    <View style={styles.contentBlock}>
                        <View style={styles.flexWrapper}>
                            <Text style={styles.smallHeader}>Location</Text>
                            <Text style={styles.smallHeader}>
                                {reportObject?.subLocationList?.[0]?.description || ""}
                            </Text>
                        </View>
                        <View style={styles.flexWrapper}>
                            <Text style={styles.smallHeader}>Report Date</Text>
                            <Text style={styles.smallHeader}>
                                {moment
                                    .utc(reportObject?.reportDate)
                                    .format("YYYY-MM-DD")}
                            </Text>
                        </View>
                        <View style={styles.flexWrapper}>
                            <Text style={styles.smallHeader}>Planned Start Date</Text>
                            <Text style={styles.smallHeader}>
                                {moment
                                    .utc(reportObject?.plannedStartDate)
                                    .format("YYYY-MM-DD")}
                            </Text>
                        </View>
                        <View style={styles.flexWrapper}>
                            <Text style={styles.smallHeader}>Proposed Job Approver</Text>
                            <Text style={styles.smallHeader}>
                                {reportObject?.resourceAllocations?.proposedJobApprover?.name || "No Proposed Job Approver Assigned "}
                            </Text>
                        </View>
                        <View style={styles.flexWrapper}>
                            <Text style={styles.smallHeader}>Report Prepared By</Text>
                            <Text style={styles.smallHeader}>
                                {reportObject?.resourceAllocations?.createdBy.name
                                }
                            </Text>
                        </View>
                        <View style={styles.flexWrapper}>
                            <Text style={styles.smallHeader}>Resources</Text>
                            <View style={styles.resourcesWrapper}>
                                {reportObject?.resourceAllocations?.resourcesList &&
                                    reportObject?.resourceAllocations?.resourcesList
                                        .length ? (
                                    <View>
                                        {reportObject?.resourceAllocations?.resourcesList?.map(
                                            (user, idx) => {
                                                return <Text style={{ marginLeft: 20, fontSize: 8 }} key={idx}>
                                                    {idx + 1}. {user?.name}
                                                </Text>;
                                            }
                                        )}
                                    </View>
                                ) : (
                                    <Text style={styles.smallHeader}>Resource List Not Found</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>

                {/* Audit Purpose */}
                <View break>
                    <Text style={styles.sectionTitle}>Financial & Operational Key Figures</Text>
                    {data.auditPurpose.map((img, idx) => (
                        <Image src={img} key={idx} />
                    ))}

                </View>


                {/* Audit Purpose */}
                <View break>
                    <Text style={styles.sectionTitle}>Summary Of Main Findings</Text>
                    {data.keyFindings.map((img, idx) => (
                        <Image src={img} key={idx} />
                    ))}
                </View>

                {/* Observations grouped by sub-location and area */}

                {/* Observations grouped by sub-location and area */}
                {groupedObservations && groupedObservations.length > 0 && (
                    <View break>
                        <Text style={styles.reportBanner}>Main Findings & Recommendation</Text>
                        {/* You originally sliced to the first four groups — kept that behavior */}
                        {groupedObservations.map((areaGroup, idx) => (
                            <View style={[styles.findingsList, { marginTop: 5 }]} key={idx} break={idx !== 0}>
                                {/* Sub-location (bold and easy to scan) */}
                                <View style={styles.locationRow}>
                                    <Text style={styles.subLocationLabel} key={idx}>
                                        {areaGroup.area}
                                    </Text>
                                </View>

                                {areaGroup.items.map((observation, oIdx) => (
                                    <View key={oIdx} style={styles.observationBlock}>
                                        {observation.observationImage.map((img, idx) => (
                                            <Image src={img} key={idx} />
                                        ))}
                                        <View>
                                            <Text style={[styles.smallHeader, { color: "#0a7386" }]}>Audit Recommendation</Text>
                                            <Text style={styles.bodyText}>{observation?.recommendedActionStep}</Text>
                                        </View>

                                        <View>
                                            <Text style={[styles.smallHeader, { color: "#0a7386" }]}>Management Comments</Text>
                                            {observation.managementCommentsImage.map((img, idx) => (
                                                <Image src={img} key={idx} />
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                )}

                {/* Extra fields */}
                {reportObject?.intAuditExtraFieldsList && reportObject?.intAuditExtraFieldsList.length !== 0 && (
                    <View break>
                        <Text style={[styles.sectionTitle, { color: "#0a7386", fontSize: 18 }]}>Audit Extra Fields</Text>
                        {reportObject?.intAuditExtraFieldsList?.map((item, index) => (
                            <View style={{ marginTop: 4 }} key={index}>
                                <View style={styles.observationBlock}>
                                    <Text style={[styles.smallHeader, { color: "#0a7386" }]}>{item?.heading?.trim()}</Text>
                                </View>
                                <View style={styles.observationBlock}>
                                    <Text style={styles.bodyText}>{item?.data?.trim()}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Annexure */}
                {!isHtmlEmpty(reportObject.annexure) && (
                    <View break>
                        <Text style={styles.sectionTitle}>Annexure</Text>
                        {data.annexure.map((img, idx) => (
                            <Image src={img} key={idx} />
                        ))}
                    </View>
                )}

                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    );
};

export default InternalAuditReportPDF;


