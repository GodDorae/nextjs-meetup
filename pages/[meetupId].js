import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";

import MeetupDetail from "../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = MongoClient.connect(
    "mongodb+srv://dh6425:K2uw1PblDkbXN1i0@meetup.c5hnj2z.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = (await client).db();

  const meetupCollection = db.collection("meetup");

  const meetups = await meetupCollection.find().toArray();

  (await client).close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = MongoClient.connect(
    "mongodb+srv://dh6425:K2uw1PblDkbXN1i0@meetup.c5hnj2z.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = (await client).db();

  const meetupCollection = db.collection("meetup");

  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  (await client).close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
