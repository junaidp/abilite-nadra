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
        display: "flex",
        flexDirection: "column",
        gap: 6,
        marginBottom: 6,
    },
});

const DetailedAuditReportPDF = ({ reportObject, logoPreview, groupedObservations, annexure }) => {


    // small helper so JSX is a bit cleaner when resolving sub-location description
    const getSubLocationDescription = (subLocationId) =>
        reportObject?.subLocationList?.find(
            (s) => s?.id === subLocationId
        )?.description || "Unknown Sub-Location";

    return (
        <Document>
            {/* Cover / First Page */}
            <Page style={styles.coverPage} size="A4">
                <View style={styles.headerContainer}>
                    <Image src={logoPreview} style={styles.logo} />
                </View>

                <View>
                    <Text style={styles.reportBanner}>Detailed Audit Report</Text>
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
                <View style={{ marginBottom: 8 }}>
                    <Text style={styles.contentsHeading}>Contents</Text>

                    <View style={styles.contentBlock}>
                        <Text style={styles.smallHeader}>01 - Sub-Locations</Text>

                        <View style={{ marginLeft: 20 }}>
                            {reportObject?.subLocationList?.map((subLocation, idx) => (
                                <Text key={idx} style={[styles.bodyText, { marginBottom: 3 }]}>
                                    {idx + 1}. {subLocation?.description}
                                </Text>
                            ))}
                        </View>

                        {reportObject?.intAuditExtraFieldsList &&
                            reportObject?.intAuditExtraFieldsList.length > 0 && (
                                <Text style={styles.smallHeader}>02 - Audit Extra Fields</Text>
                            )}
                        {
                            !isHtmlEmpty(reportObject.annexure) &&
                            <Text style={styles.smallHeader}>03 - Annexure</Text>
                        }
                    </View>
                </View>
                <View break>
                    {/* <Text style={styles.reportBanner}>Main Findings and Recommendations</Text> */}
                    {/* Observations grouped by sub-location and area */}
                    {groupedObservations && groupedObservations.length > 0 && (
                        <View style={{ marginTop: 10 }}>
                            {/* You originally sliced to the first four groups — kept that behavior */}
                            {groupedObservations.map((subLocationGroup, idx) => (
                                <View style={styles.findingsList} key={idx}>
                                    {/* Sub-location (bold and easy to scan) */}
                                    <View style={styles.locationRow}>
                                        <Text style={styles.subLocationLabel} key={idx}>
                                            {getSubLocationDescription(subLocationGroup.subLocation)}
                                        </Text>
                                    </View>

                                    {/* Areas inside this sub-location */}
                                    {subLocationGroup?.areas?.map((areaGroup, aIdx) => (
                                        <View key={aIdx} style={{ marginTop: 6 }}>
                                            <View style={styles.contentBlock}>
                                                {/* Area label (bold) */}
                                                <Text style={styles.areaLabel}>{areaGroup?.area}</Text>
                                                {/* Each observation under the area */}
                                                {areaGroup.observations.map((observation, idxx) => (
                                                    <View key={idxx} style={styles.observationBlock}>
                                                        {observation.observationImage.map((img, idx) => (
                                                            <Image src={img} key={idx} />
                                                        ))}
                                                    </View>
                                                ))}
                                            </View>
                                            <View style={styles.divider} />
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}
                </View>


                {/* Extra fields */}
                {reportObject?.intAuditExtraFieldsList && reportObject?.intAuditExtraFieldsList.length !== 0 && (
                    <View style={{ marginTop: 12 }} break>
                        <Text style={[styles.sectionTitle, { color: "#0a7386", fontSize: 18 }]}>Audit Extra Fields</Text>
                        {reportObject?.intAuditExtraFieldsList?.map((item, index) => (
                            <View style={{ marginTop: 4 }} key={index}>
                                <View style={styles.observationBlock}>
                                    <Text style={[styles.smallHeader, { color: "#0a7386" }]}>{item?.heading?.trim()}</Text>
                                </View>
                                <View style={styles.observationBlock}>
                                    <Text style={styles.bodyText}>{item?.data?.trim()}</Text>
                                </View>
                                <View style={styles.divider} />
                            </View>
                        ))}
                    </View>
                )}

                {/* Annexure */}
                {!isHtmlEmpty(reportObject.annexure) && (
                    <View style={{ marginTop: 12 }} break>
                        <Text style={styles.sectionTitle}>Annexure</Text>
                        {annexure.map((img, idx) => (
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

export default DetailedAuditReportPDF;

