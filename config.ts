export const ALLOWED_DURATIONS = [20, 30, 45, 60, 120] as const
export type AllowedDuration = (typeof ALLOWED_DURATIONS)[number]

export const DEFAULT_DURATION = 30

export const CALENDARS_TO_CHECK = ['primary']

export const SLOT_PADDING = 30

export const OWNER_TIMEZONE = 'Europe/Madrid'

export const DEFAULT_WORKDAY: AvailabilityScheduleMap[] = [
    {
        start: {
            hour: 16
        },
        end: {
            hour: 20
        }
    }
]
// const MORNING_WORKDAY: AvailabilityScheduleMap[] = [
//     {
//         start: {
//             hour: 9
//         },
//         end: {
//             hour: 12
//         }
//     }
// ]
const AFTERNOON_WORKDAY: AvailabilityScheduleMap[] = [
    {
        start: {
            hour: 16
        },
        end: {
            hour: 20
        }
    }
]
const SATURDAY: AvailabilityScheduleMap[] = [
    {
        start: {
            hour: 10
        },
        end: {
            hour: 14
        }
    }
]
const SUNDAY: AvailabilityScheduleMap[] = [
    {
        start: {
            hour: null
        },
        end: {
            hour: null
        }
    }
]

export const OWNER_AVAILABILITY: AvailabilitySlotsMap = {
    1: AFTERNOON_WORKDAY, // MONDAY
    2: AFTERNOON_WORKDAY, // TUESDAY
    3: AFTERNOON_WORKDAY, // WEDNESDAY
    4: AFTERNOON_WORKDAY, // THURSDAY
    5: AFTERNOON_WORKDAY, // FRIDAY
    6: SATURDAY, // SATURDAY
    0: SUNDAY // SUNDAY
}

export interface AvailabilityScheduleMap {
    start: {
        hour: number | null
    }
    end: {
        hour: number | null
    }
}
export interface AvailabilitySlotsMap {
    [key: number]: AvailabilityScheduleMap[]
}
