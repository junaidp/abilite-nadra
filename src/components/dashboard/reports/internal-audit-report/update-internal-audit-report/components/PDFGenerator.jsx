import logo from "../../../../../../assets/logo.png";
import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  reportInfoView: {
    flexDirection: "column",
  },
  reportInfoViewItem: {
    flexDirection: "row",
    marginTop: 10,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#0a7386",
    padding: 10,
    textAlign: "center",
  },

  reportInfoTitle: {
    color: "#0a7386",
    fontSize: 12,
  },
  reportInfoSubTitle: {
    fontSize: 10,
    marginTop: 2,
  },
  reportTitle: {
    fontSize: 10,
  },
  paragraph: {
    fontSize: 12,
  },
});

const PDFGenerator = () => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.title}>Internal Audit Report</Text>
        </View>
        <View style={styles.reportNameView}>
          <Text style={styles.reportTitle}>
            Internal Audit Report Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book.
          </Text>
        </View>
        <View style={styles.reportNameView}>
          <View style={styles.reportInfoViewItem}>
            <Text style={styles.reportInfoTitle}>Report Date:</Text>
            <Text style={styles.reportInfoSubTitle}>4-1-124</Text>
          </View>
        </View>
        <Text break style={styles.paragraph}>
          Second break
        </Text>
      </Page>
    </Document>
  );
};

export default PDFGenerator;
