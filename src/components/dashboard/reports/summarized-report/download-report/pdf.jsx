import React from "react";
import { isHtmlEmpty } from "../../../../../config/helper";
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
        paddingTop: PAGE_PADDING,
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
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 5,
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
        bottom: 5,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 10,
        padding: 5,
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

    // 
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        borderRightWidth: 0,
        borderBottomWidth: 0,
        fontSize: TYPOGRAPHY.body,
    },
    tableRow: {
        flexDirection: "row",
        fontSize: TYPOGRAPHY.body,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#f0f0f0",
        fontSize: TYPOGRAPHY.body,
    },
    tableCol: {
        borderStyle: "solid",
        borderColor: "#000",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        padding: 4,
        fontSize: TYPOGRAPHY.body,
    },
    colObs: { width: "5%" },
    colDesc: { width: "75%" },
    colDau: { width: "20%" },
    textBold: {
        fontWeight: "bold",
    },
});

const SummarizedReportPDF = ({ reportObject, logoPreview, allLocations, data, groupedObservations }) => {
    const subLocationMap = React.useMemo(() => {
        const map = {};
        allLocations.forEach(loc => {
            (loc.subLocations || []).forEach(subLoc => {
                map[subLoc.id] = subLoc.description;
            });
        });
        return map;
    }, [allLocations]);


    const findSubLocationDescription = (id) =>
        subLocationMap[id] || "Unknown Sub-location";

    return (
        <Document>
            {/* Cover / First Page */}
            <Page style={styles.coverPage} size="A4">
                <View style={styles.headerContainer}>
                    <Image src={logoPreview} style={styles.logo} />
                </View>

                <View>
                    <Text style={styles.reportBanner}>Auditor's Report</Text>
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

                {/* Bottom footer */}
                <View style={styles.pageFooter} fixed>
                    <Text style={styles.smallMeta}>{reportObject?.reportName}</Text>
                    <Image src={logoPreview} style={{ width: 40 }} />
                </View>

                {/* Contents / Table of contents */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.contentsHeading}>Contents</Text>

                    <View style={styles.contentBlock}>
                        <Text style={styles.smallHeader}>01 - Identification</Text>
                        <Text style={styles.smallHeader}>02 - Executive Summary</Text>
                        <Text style={styles.smallHeader}>03 - Audit Purpose</Text>
                        <Text style={styles.smallHeader}>04 - Previous Audit Follow Up</Text>
                        <Text style={styles.smallHeader}>05 - Operational Highlights</Text>
                        <Text style={styles.smallHeader}>06 - Main Findings and Recommendations</Text>

                        <View style={{ marginLeft: 20 }}>
                            {reportObject?.consolidationItemsList?.map((consolidatedItem, idx) => (
                                <Text style={styles.bodyText} key={idx}>
                                    {idx + 1}. {consolidatedItem?.area}
                                </Text>
                            ))}
                        </View>
                        {
                            !isHtmlEmpty(reportObject.annexure) &&
                            <Text style={styles.smallHeader}>07 - Annexure</Text>
                        }
                    </View>
                </View>

                {/* Overview */}
                <View style={{ marginTop: 6 }} break>
                    <Text style={styles.sectionTitle}>Identification</Text>
                    <Image src={data.overView} style={{ width: "100%" }} />
                </View>

                {/* Executive Summary */}
                <View style={{ marginTop: 6 }} break>
                    <Text style={styles.sectionTitle}>Executive Summary</Text>
                    <Image src={data.executiveSummary} style={{ width: "100%" }} />
                </View>

                {/* Audit Purpose */}
                <View style={{ marginTop: 6 }} break>
                    <Text style={styles.sectionTitle}>Audit Purpose</Text>
                    <Image src={data.auditPurpose} style={{ width: "100%" }} />
                </View>

                {/* Previous Audit Follow Up */}
                <View style={{ marginTop: 6 }} break>
                    <Text style={styles.sectionTitle}>Previous Audit Follow Up</Text>
                    <Image src={data.previousAuditFollowUp} style={{ width: "100%" }} />
                </View>

                {/* Previous Audit Follow Up */}
                <View style={{ marginTop: 6 }} break>
                    <Text style={styles.sectionTitle}>Operational Highlights</Text>
                    <Image src={data.operationalHighlight} style={{ width: "100%" }} />
                </View>

                {/* Observations grouped by sub-location and area */}
                <View style={{ marginTop: 10 }} break>
                    {/* You originally sliced to the first four groups — kept that behavior */}
                    {groupedObservations.map((consolidatedItem, idx) => (
                        <View key={idx} style={{ marginBottom: 5 }}>
                            {/* Section Title */}
                            <Text style={styles.sectionTitle}>{consolidatedItem.area}</Text>

                            {/* Table */}
                            <View style={styles.table}>
                                {/* Header Row */}
                                <View style={[styles.tableRow, styles.tableHeader]}>
                                    <Text style={[styles.tableCol, styles.colObs, styles.textBold]}>
                                        Obs #
                                    </Text>
                                    <Text style={[styles.tableCol, styles.colDesc, styles.textBold]}>
                                        Description
                                    </Text>
                                    <Text style={[styles.tableCol, styles.colDau, styles.textBold]}>
                                        sub location
                                    </Text>
                                </View>

                                {/* Data Rows */}
                                {consolidatedItem.consolidatedObservations.map((obs, i) => (
                                    <View style={styles.tableRow} key={i}>
                                        <Text style={[styles.tableCol, styles.colObs]}>{i + 1}</Text>
                                        <View style={[styles.tableCol, styles.colDesc]}>
                                            <Image src={obs.summaryOfKeyFindingImage} style={{ width: "100%" }} />
                                        </View>
                                        <View style={[styles.tableCol, styles.colDau]}>
                                            {obs.reportingList.map((loc, idx) => (
                                                <Text key={idx}>{findSubLocationDescription(loc?.subLocation)}</Text>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Annexure */}
                {!isHtmlEmpty(reportObject.annexure) && (
                    <View style={{ marginTop: 12 }} break>
                        <Text style={styles.sectionTitle}>Annexure</Text>
                        <Image src={data.annexure} style={{ width: "100%" }} />
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

export default SummarizedReportPDF;

