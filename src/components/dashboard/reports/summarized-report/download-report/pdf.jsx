import React from "react";
import Html from "react-pdf-html";
import { cleanHtml } from "../../../../../config/helper";
import {
    Document,
    Page,
    Text,
    StyleSheet,
    View,
    Image,
} from "@react-pdf/renderer";


// central layout & typography constants for consistent look across all pages
const PAGE_PADDING = 35;
const TYPOGRAPHY = {
    title: 16,
    section: 12,
    subsection: 14,
    smallHeader: 8,
    body: 8,
    small: 7,
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
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 10,
        padding: 30,
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

const PDFGenerator = ({ reportObject, logoPreview, allLocations }) => {
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
                {/* Top small header / meta info */}
                <View style={styles.pageStarter} fixed wrap>
                    <Text style={styles.smallMeta}>{reportObject?.reportName}</Text>
                    <Image src={logoPreview} style={{ width: 40 }} />
                </View>

                {/* Contents / Table of contents */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.contentsHeading}>Contents</Text>

                    <View style={styles.contentBlock}>
                        <Text style={styles.smallHeader}>Overview</Text>
                        <Text style={styles.smallHeader}>Executive Summary</Text>
                        <Text style={styles.smallHeader}>Audit Purpose</Text>
                        <Text style={styles.smallHeader}>Previous Audit Follow Up</Text>
                        <Text style={styles.smallHeader}>Operational Highlights</Text>
                        <Text style={styles.smallHeader}>Main Findings and Recommendations</Text>

                        <View style={{ marginLeft: 20 }}>
                            {reportObject?.consolidationItemsList?.map((consolidatedItem, idx) => (
                                <Text style={styles.bodyText} key={idx}>
                                    {idx + 1}. {consolidatedItem?.area}
                                </Text>
                            ))}
                        </View>

                        {reportObject?.intAuditExtraFieldsList &&
                            reportObject?.intAuditExtraFieldsList.length > 0 && (
                                <Text style={styles.smallHeader}>Audit Extra Fields</Text>
                            )}

                        <Text style={styles.smallHeader}>Annexure</Text>
                    </View>
                </View>

                {/* Overview */}
                <View style={{ marginTop: 6 }} break>
                    <Text style={styles.sectionTitle}>Overview</Text>
                    <Html style={{ width: "100%", fontSize: 8 }}>
                        {cleanHtml(reportObject?.overView)}
                    </Html>
                </View>

                {/* Executive Summary */}
                <View style={{ marginTop: 6 }} break>
                    <Text style={styles.sectionTitle}>Executive Summary</Text>
                    <Html style={{ width: "100%", fontSize: 8 }}>
                        {cleanHtml(reportObject?.executiveSummary)}
                    </Html>
                </View>

                {/* Audit Purpose */}
                <View style={{ marginTop: 6 }} break>
                    <Text style={styles.sectionTitle}>Audit Purpose</Text>
                    <Html style={{ width: "100%", fontSize: 8 }}>
                        {cleanHtml(reportObject?.auditPurpose)}
                    </Html>
                </View>

                {/* Previous Audit Follow Up */}
                <View style={{ marginTop: 6 }} break>
                    <Text style={styles.sectionTitle}>Previous Audit Follow Up</Text>
                    <Html style={{ width: "100%", fontSize: 8 }}>
                        {cleanHtml(reportObject?.previousAuditFollowUp)}
                    </Html>
                </View>

                {/* Previous Audit Follow Up */}
                <View style={{ marginTop: 6 }} break>
                    <Text style={styles.sectionTitle}>Operational Highlights</Text>
                    <Html style={{ width: "100%", fontSize: 8 }}>
                        {cleanHtml(reportObject?.operationalHighlight)}
                    </Html>
                </View>

                {/* Observations grouped by sub-location and area */}
                <View style={{ marginTop: 10 }} break>
                    {/* You originally sliced to the first four groups — kept that behavior */}
                    {reportObject.consolidationItemsList.map((consolidatedItem, idx) => (
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
                                            <Html style={{ width: "100%", fontSize: 8 }}>
                                                {cleanHtml(obs.summaryOfKeyFinding)}
                                            </Html>
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

                {/* Extra fields */}
                {reportObject?.intAuditExtraFieldsList && reportObject?.intAuditExtraFieldsList.length !== 0 && (
                    <View style={{ marginTop: 12 }} break>
                        <Text style={[styles.sectionTitle, { color: "#0a7386", fontSize: 18 }]}>Audit Extra Fields</Text>
                        {reportObject?.intAuditExtraFieldsList?.map((item, index) => (
                            <View style={{ marginTop: 4 }} key={index}>
                                <View style={styles.observationBlock}>
                                    <Text style={[styles.smallHeader, { color: "#0a7386" }]}>Heading</Text>
                                    <Text style={styles.bodyText}>{item?.heading?.trim()}</Text>
                                </View>
                                <View style={styles.observationBlock}>
                                    <Text style={[styles.smallHeader, { color: "#0a7386" }]}>Data</Text>
                                    <Text style={styles.bodyText}>{item?.data?.trim()}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Annexure */}
                {reportObject?.annexure && reportObject?.annexure !== "" && (
                    <View style={{ marginTop: 12 }} break>
                        <Text style={styles.sectionTitle}>Annexure</Text>
                        <Html style={{ width: "100%", fontSize: 8 }}>
                            {cleanHtml(reportObject?.annexure)}
                        </Html>
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

export default PDFGenerator;

