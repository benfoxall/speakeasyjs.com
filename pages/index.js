import {
  Avatar,
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Wrap
} from '@chakra-ui/core'

import { ButtonLink } from '../components/ButtonLink'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Link } from '../components/Link'

import { colorScheme } from '../theme'

const HomePage = ({ events }) => {
  return (
    <Box
      px={4}
      py={32}
      fontSize='lg'
    >
      <Header />
      <Footer />

      <Container maxWidth='lg'>
        <Stack spacing={16} align='center'>

          <Stack spacing={8} align='center'>
            <Heading as='h1' size='xl' mt={[0, 4, 6]}>
              Psst... You've found it.
            </Heading>

            <Text fontSize='xl'>
              This is the JavaScript meetup for 🥼&nbsp;mad science, 🧙‍♂️&nbsp;hacking, and 🧪&nbsp;experiments.
            </Text>

            <Text fontSize='xl'>
              Hang out virtually on <Text as='strong'><Text as='u'>Friday at 4pm Pacific Time</Text></Text> each week.
            </Text>
          </Stack>

          <Stack spacing={8} align='center'>
            <Heading as='h1' size='lg' textAlign='center'>
              Here's what's going down <Text as='em'><Text as='u'>this Friday</Text></Text> ({events[0].date})
            </Heading>

            <Event
              event={events[0]}
            />
          </Stack>

          <ButtonLink
            colorScheme={colorScheme}
            size='lg'
            href='/buy'
          >
            If you dig it, get a ticket
          </ButtonLink>

          <Stack spacing={8} align='center'>
            <Heading as='h1' size='lg' textAlign='center'>
              And here's a sneak peak at <Text as='em'><Text as='u'>next Friday</Text></Text> ({events[1].date})
            </Heading>

            <Event
              event={events[1]}
            />
          </Stack>

          <Stack spacing={8} align='center'>
            <Heading as='h1' size='lg' textAlign='center'>
              Keep these URLs on the DL
            </Heading>

            <Wrap justify='center'>
              <ButtonLink
                href='https://calendar.google.com/calendar?cid=MXNrMmtvOWRqMnNhNzNsN20xbnFudWJydjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ'
                size='md'
              >
              Add to Google Calendar
              </ButtonLink>
              <ButtonLink
                href='https://calendar.google.com/calendar/ical/1sk2ko9dj2sa73l7m1nqnubrv4%40group.calendar.google.com/public/basic.ics'
                size='md'
              >
              Subscribe via iCal
              </ButtonLink>
              <ButtonLink
                href='https://twitter.com/Speakeasy_JS'
                size='md'
              >
                Follow @Speakeasy_JS on Twitter
              </ButtonLink>
            </Wrap>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default HomePage

const Event = ({ event, ...rest }) => (
  <Stack spacing={8} {...rest}>
    {event.schedule.map(item => (
      <EventItem key={item.time} item={item} />
    ))}
  </Stack>
)

const EventItem = ({ item }) => (
  <Stack direction={['column', 'row']}>
    <Box
      color='gray.500'
      mr={[0, 6]}
      mb={[4, 0]}
      textAlign={['center', 'right']}
    >
      {item.time} PM
    </Box>

    <Stack
      maxWidth='sm'
    >
      <Box textAlign={['center', 'left']}>
        <Text as='strong'>{item.title}</Text>
      </Box>

      {item.twitter && item.name &&
        <>
          <Link href={`https://twitter.com/${item.twitter}`} showExternalIcon={false}>
            <Stack
              direction='row'
              justify={['center', 'flex-start']}
              align='center'
            >
              <Avatar
                name={item.name}
                src={`http://twivatar.glitch.me/${item.twitter}`}
                size='sm'
              />
              <Box fontSize='md' color='gray.700'>
                {item.name}
              </Box>
            </Stack>
          </Link>
        </>}
    </Stack>
  </Stack>
)

export async function getServerSideProps (ctx) {
  return {
    props: {
      events: [
        {
          date: 'September 4',
          schedule: [
            {
              time: '4:00',
              title: 'Build a WebRTC app in 10 minutes',
              name: 'Feross Aboukhadijeh',
              twitter: 'feross'
            },
            {
              time: '4:15',
              title: 'ZDAG – a compressed block format',
              name: 'Mikeal Rogers',
              twitter: 'mikeal'
            },
            {
              time: '4:30',
              title: 'Social Happy Hour'
            }
          ]
        },
        {
          date: 'September 11',
          schedule: [
            {
              time: '4:00',
              title: 'Hyperbee – An append-only Btree running on a Hypercore',
              name: 'Mathius Buus',
              twitter: 'mafintosh'
            },
            {
              time: '4:30',
              title: 'Social Happy Hour'
            }
          ]
        }
      ]
    }
  }
}
