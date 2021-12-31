import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from './../components/Banner'
import { Box, Flex } from '@chakra-ui/react'
import { fetchApi } from '../utils/fetchApi'
import { baseUrl } from './../utils/fetchApi'
import Property from './../components/Property'

export default function Home({ propertiesForRent, propertiesForSale }) {
  console.log(propertiesForSale)
  return (
    <Box>
      <Banner
        purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='Everyone'
        desc1='Explore Apratments'
        desc2='and more'
        buttonText='Expore renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose='BUY A HOME'
        title1=' Find, Buy & Own Your'
        title2='Dream Home'
        desc1=' Explore from Apartments, land, builder floors,'
        desc2=' villas and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  )
}

export async function getStaticProps(context) {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  )
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  )
  return {
    props: {
      propertiesForRent: propertyForRent?.hits,
      propertiesForSale: propertyForSale?.hits,
    },
  }
}
