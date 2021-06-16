// import axios from "../../libs/axios";
import axios from 'axios'
import config from "../../configs/endpoints"
const { baseUrl } = config;


const fetchProducerOptions = async () => {
  try {
    // const { data } = await axios.get(`${baseUrl}/ebs/api/v1/producers/names`, {});
    const data = {
      "name": [
        "NASCO",
        "Edifecs",
        "Oneil",
        "NEB",
        "Salesconnect",
        "Incomm"
      ],
      "route": [
        {
          "routeId": 1,
          "routeName": "Nasco PEP",
          "hopId": 2,
          "hopName": 'hopId2'
        },
        {
          "routeId": 1,
          "routeName": "Nasco PEP",
          "hopId": 3,
          "hopName": 'hopId3'
        },
        {
          "routeId": 2,
          "routeName": "Nasco CnA",
          "hopId": 5,
          "hopName": 'hopId5'
        },
        {
          "routeId": 2,
          "routeName": "Nasco CnA",
          "hopId": 6,
          "hopName": 'hopId6'
        },
        {
          "routeId": 3,
          "routeName": "PSP PEP",
          "hopId": 8,
          "hopName": null
        },
        {
          "routeId": 3,
          "routeName": "PSP PEP",
          "hopId": 9,
          "hopName": null
        },
        {
          "routeId": 4,
          "routeName": "Edifecs PSP",
          "hopId": 11,
          "hopName": null
        },
        {
          "routeId": 4,
          "routeName": "Edifecs PSP",
          "hopId": 12,
          "hopName": null
        },
        {
          "routeId": 5,
          "routeName": "834 PSP",
          "hopId": 14,
          "hopName": null
        },
        {
          "routeId": 5,
          "routeName": "834 PSP",
          "hopId": 15,
          "hopName": null
        },
        {
          "routeId": 6,
          "routeName": "Oneil NEB",
          "hopId": 17,
          "hopName": null
        },
        {
          "routeId": 6,
          "routeName": "Oneil NEB",
          "hopId": 18,
          "hopName": null
        }
      ],
      "producerNames": [
        {
          "producerId": 1,
          "producerName": "NASCO",
          "sftAccountName": "fb15exs023"
        },
        {
          "producerId": 2,
          "producerName": "Edifecs",
          "sftAccountName": "fb15exs024"
        },
        {
          "producerId": 3,
          "producerName": "Oneil",
          "sftAccountName": "fb16exs004"
        },
        {
          "producerId": 5,
          "producerName": "NEB",
          "sftAccountName": "fb15exp070"
        },
        {
          "producerId": 6,
          "producerName": "Salesconnect",
          "sftAccountName": "fb16exp050"
        },
        {
          "producerId": 7,
          "producerName": "Incomm",
          "sftAccountName": "fb14exs029"
        }
      ],
      "frequencySpecifierNames": [
        {
          "frequencySpecifierId": 1,
          "frequencySpecifier": "MONDAY",
          "frequencyId": 1,
          "frequency": "DayOfWeekAndTime"
        },
        {
          "frequencySpecifierId": 2,
          "frequencySpecifier": "TUESDAY",
          "frequencyId": 1,
          "frequency": "DayOfWeekAndTime"
        },
        {
          "frequencySpecifierId": 3,
          "frequencySpecifier": "WEDNESDAY",
          "frequencyId": 1,
          "frequency": "DayOfWeekAndTime"
        },
        {
          "frequencySpecifierId": 4,
          "frequencySpecifier": "THURSDAY",
          "frequencyId": 1,
          "frequency": "DayOfWeekAndTime"
        },
        {
          "frequencySpecifierId": 5,
          "frequencySpecifier": "FRIDAY",
          "frequencyId": 1,
          "frequency": "DayOfWeekAndTime"
        },
        {
          "frequencySpecifierId": 6,
          "frequencySpecifier": "SATURDAY",
          "frequencyId": 1,
          "frequency": "DayOfWeekAndTime"
        },
        {
          "frequencySpecifierId": 7,
          "frequencySpecifier": "SUNDAY",
          "frequencyId": 1,
          "frequency": "DayOfWeekAndTime"
        },
        {
          "frequencySpecifierId": 21,
          "frequencySpecifier": "Begin",
          "frequencyId": 2,
          "frequency": "Monthly"
        },
        {
          "frequencySpecifierId": 22,
          "frequencySpecifier": "End",
          "frequencyId": 2,
          "frequency": "Monthly"
        }
      ],
      "status": "Success"
    }
      return data
      // return data.name.map(d=>({
      //   value: d,
      //   label: d
      // }))
  } catch (err) {
    console.error(err && err.message);
  }
  return [];
};

const fetchFileMaskOptions = async ({ producer }) => {
  try {
    const { data } = await axios.get(`${baseUrl}/ebs/api/v1/producers/files/masks${producer ? `?producer=${producer}` : ''}`, {});
      return data.prefix.map(d=>({
        value: d,
        label: d
      }))
  } catch (err) {
    console.error(err && err.message);
  }
  return [];
};

export default { fetchProducerOptions, fetchFileMaskOptions };
