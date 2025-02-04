
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAxiosSecure } from '../../hooks/useAxiosSecure';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

const Print = () => {
  const { id } = useParams()
  const axiosSecure = useAxiosSecure()
  const printingDate = moment().format('dddd, MMMM Do YYYY')

  const { data: assetsDetails } = useQuery({
    queryKey: ['assetsDetails'],
    queryFn: async() => {
      const res = await axiosSecure.get(`/assets/individual/${id}`)
      return res.data
    }
  })

  const styles = StyleSheet.create({
    page: {
      padding: '20px 300px 20px 300px' ,
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      gap: 20,
      border: '1px solid black'
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
     
      padding: 10,
      borderRadius: 5,
    },
    heading: {
    fontSize: 30  
    },
    email: {
      fontSize: 25,
      textAlign: 'center'
    },
    text: {
      fontSize: 20,
      margin: '20px 0px 0px 0px',
    },
 
  });


  return (
    <div className='my-20  flex justify-center'>
      <Helmet>
        <title>Assets | Print</title>
      </Helmet>
      <Document>
        <Page style={styles.page}>
          {/* Column 1 */}
          <View style={styles.column}>
            <Text style={styles.heading}>HR Manager Mail</Text>
            <Text style={styles.email}>{assetsDetails?.email}</Text>
          </View>

          {/* Column 2 */}
          <View style={styles.column}>
            <Text style={styles.heading}>Assets Information</Text>
            <Text style={styles.text}>Product Name: {assetsDetails?.productName}</Text>
            <Text style={styles.text}>ProductType: {assetsDetails?.productType}</Text>
          </View>

          {/* Column 3 */}
          <View style={styles.column}>
            <Text style={styles.heading}>Print Date{printingDate}</Text>
            <Text style={styles.text}>{printingDate}</Text>
          </View>
        </Page>
      </Document>
    </div>
  );
};

export default Print;