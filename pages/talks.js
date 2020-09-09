import {
  Box,
  Container,
  SimpleGrid,
  Heading
} from '@chakra-ui/core'
import { format, parse } from 'date-fns'

import { Header } from '../components/Header'
import { Event } from '../components/Event'

import events from '../events'

const TalksPage = ({ events }) => {
  return (
    <Box
      px={4}
      py={32}
      fontSize='lg'
    >
      <Header />

      <Container maxWidth='xl'>

        {events
          .reverse()
          .filter(event => new Date(event.date) < Date.now())
          .map(event => (
            <Box key={event.date} mb={[10, 10, 16]}>
              <Heading as='h1' size='lg' textAlign='center' mb={8}>
                {format(parse(event.date, 'yyyy-MM-dd', new Date()), 'EEEE LLLL d, yyyy')}
              </Heading>
              <SimpleGrid columns={[1, 1, 2]} spacing={8}>
                <Event
                  event={event}
                />
                {event.youtube &&
                  <iframe
                    width='450'
                    height='255'
                    src={`https://www.youtube-nocookie.com/embed/${event.youtube}`}
                    frameborder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />}
              </SimpleGrid>
            </Box>
          ))}
      </Container>
    </Box>
  )
}

export default TalksPage

export async function getServerSideProps (ctx) {
  return {
    props: {
      events,
      title: 'Past Talks',
      description: 'Watch past talks from Speakeasy JS'
    }
  }
}