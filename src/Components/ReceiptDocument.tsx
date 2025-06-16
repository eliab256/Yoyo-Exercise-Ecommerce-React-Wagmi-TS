import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 30,
        fontFamily: 'Helvetica',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333333',
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
        color: '#666666',
    },
    section: {
        margin: 10,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 5,
        border: '1px solid #dee2e6',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingVertical: 4,
    },
    label: {
        width: '30%',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#495057',
    },
    value: {
        width: '70%',
        fontSize: 12,
        color: '#212529',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 10,
        color: '#6c757d',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
        marginVertical: 15,
    },
});

export interface ReceiptData {
    name: string;
    description: string;
    id: number;
    transactionTx: number;
}

const ReceiptDocument: React.FC<ReceiptData> = ({ name, description, id, transactionTx }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Ricevuta Esercizio</Text>
            <Text style={styles.subHeader}>
                Data: {new Date().toLocaleDateString('it-IT')} - {new Date().toLocaleTimeString('it-IT')}
            </Text>

            <View style={styles.section}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10, color: '#495057' }}>
                    Exercise Details
                </Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{name}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Exercise id:</Text>
                    <Text style={styles.value}>{id}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.value}>{description}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Transaction ID:</Text>
                    <Text style={styles.value}>{transactionTx}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Stato:</Text>
                    <Text style={styles.value}>Completata</Text>
                </View>
            </View>

            <Text style={styles.footer}>
                Questo documento è stato generato automaticamente il {new Date().toLocaleString('it-IT')}
            </Text>
        </Page>
    </Document>
);

export default ReceiptDocument;
