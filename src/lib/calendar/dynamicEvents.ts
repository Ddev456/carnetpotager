import { type Plants, type NativesEvents } from "@prisma/client";
import { type EventType } from "../scheme/events";

export type nativeEvent = {
    id: string;
    plantId: number;
    nursery?: number,
    seedling?: number,
    transplanting?: number,
    thinning?: number,
    plantation?: number,
    harvest?: number,
}

export const dynamicEvents = (plants: Plants[], nativesEvents: NativesEvents[], climate = 0) => {

    const getPlantInfos = (id: number) => {
        const plantInfos = plants.filter(plant => (plant.id === id));
        return plantInfos;
    };

    // type actionObject = {
    //     actionName: string;
    //     actions: number[];
    // }

    // const findActions = (actionObject: actionObject[]) => {
    //     const listOfActions: string[] = [];
    //     actionObject.map(action=> { 
    //         if(action.actions.length === 5){
    //             listOfActions.push(action.actionName);
    //         }
    //     });
    //     return listOfActions;
    // };

    // const actions = nativesEvents.map(nEvent =>
    //     findActions([{actionName: "nursery", actions: nEvent.nursery}, {actionName: "seedling", actions: nEvent.seedling}, {actionName: "transplanting", actions: nEvent.transplanting}, {actionName: "thinning", actions: nEvent.thinning}, {actionName: "plantation", actions: nEvent.plantation}, {actionName: "harvest", actions: nEvent.harvest}]),
    // );

    // const getActions = () => {

    // }
// d'abord exemple generation events climat mediterannéen 
// map sur actions et sur index 0 de chaque action
//  result de action X event

const DateIso = ({week, year}: {week: number, year: number}) => {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    // const day = (1 + (week!) * 7)
    // const ISOweekStart = new Date(year, 0, day)
    return {
        ISOweekStart
    };
};

    type eventInfos = {
        actionItemName: string;
        backgroundColor: string;
    }

    const eventInfos: eventInfos[] = [{
        actionItemName: "Semis pépinière",
        backgroundColor: "#5eead4"
    },
    {
        actionItemName: "Semis",
        backgroundColor: "#fed7aa",
    },
    {
        actionItemName: "Repiquage",
        backgroundColor: "#fca5a5",
    },
    {
        actionItemName: "Eclaircissage",
        backgroundColor: "#7dd3fc",
    },
    {
        actionItemName: "Plantation",
        backgroundColor: "#bef264",
    },
    {
        actionItemName: "Récolte",
        backgroundColor: "#fde68a",
    }
    ];

    const getDynamicEvent = (actionItem: number, eventInfos: eventInfos, item: NativesEvents, action: string) => {
        const plantName = getPlantInfos(item.plantId)[0]?.name;
        // const title = `${actionItemName} de ${plantName}`;
        const title = `${plantName} `;
        const start = DateIso({week: actionItem, year: 2023}).ISOweekStart;
        // const extProps = Object.keys(item)[actionItem];
        const dynamicEvent = {
            id: eventInfos.actionItemName+item.plantId,
            title: title,
            start: start,
            extendedProps: {action: action, plant: getPlantInfos(item.plantId)[0]?.thumbnail},
            allDay: true,
            // backgroundColor: eventInfos.backgroundColor,
            backgroundColor: "#ffffff",
            textColor: "#3F3D56",
        };
        return dynamicEvent;
    };



    const potager = () => {
        const dynamicEvents: EventType[] = [];
        nativesEvents.map((item) => {
        if(item.nursery){
            const nurseryEvent = getDynamicEvent(item.nursery+climate, {
                actionItemName: "Semis pépinière",
                backgroundColor: "#5eead4"
            }, item, "nursery");
            dynamicEvents.push({...nurseryEvent});
        }
        if(item.seedling){
            const seedlingEvent = getDynamicEvent(item.seedling+climate, {
                actionItemName: "Semis",
                backgroundColor: "#fed7aa",
            }, item, "seedling");
            dynamicEvents.push({...seedlingEvent});
        }
        if(item.transplanting){
            const transplantingEvent = getDynamicEvent(item.transplanting+climate, {
                actionItemName: "Repiquage",
                backgroundColor: "#fca5a5",
            }, item, "transplanting");
            dynamicEvents.push({...transplantingEvent});
        }  
        if(item.thinning){
            const thinningEvent = getDynamicEvent(item.thinning+climate, {
                actionItemName: "Eclaircissage",
                backgroundColor: "#7dd3fc",
            }, item, "thinning");
            dynamicEvents.push({...thinningEvent});
        }
        if(item.plantation){
            const plantationEvent = getDynamicEvent(item.plantation+climate, {
                actionItemName: "Plantation",
                backgroundColor: "#bef264",
            }, item, "plantation");
            dynamicEvents.push({...plantationEvent});
        }
        if(item.harvest){
            const harvestEvent = getDynamicEvent(item.harvest+climate, {
                actionItemName: "Récolte",
                backgroundColor: "#fde68a",
            }, item, "harvest");
            dynamicEvents.push({...harvestEvent});
        }
    });
    const sortedEvents = dynamicEvents.sort((a, b) => {
        return a.start.getTime() - b.start.getTime();
    });
    const etalonnage = sortedEvents.map((sortedItem, index) => {
        const isE = ((index % 2) === 0);
        isE ? sortedItem.start = new Date(sortedItem.start.setDate(sortedItem.start.getDate() + 1)) : sortedItem;
        return sortedItem;
    }
     );
    return etalonnage;
};



    const mediter = () => {
        const dynamicEvents: EventType[] = []; 
        nativesEvents.map((item) => {
        if(item.nursery){
            const nurseryEvent = getDynamicEvent(item.nursery, {
                actionItemName: "Semis pépinière",
                backgroundColor: "#5eead4"
            }, item, "nursery");
            dynamicEvents.push({...nurseryEvent});
        }
        if(item.seedling){
            const seedlingEvent = getDynamicEvent(item.seedling, {
                actionItemName: "Semis",
                backgroundColor: "#fed7aa",
            }, item, "seedling");
            dynamicEvents.push({...seedlingEvent});
        }
        if(item.transplanting){
            const transplantingEvent = getDynamicEvent(item.transplanting, {
                actionItemName: "Repiquage",
                backgroundColor: "#fca5a5",
            }, item, "transplanting");
            dynamicEvents.push({...transplantingEvent});
        }
        if(item.thinning){
            const thinningEvent = getDynamicEvent(item.thinning, {
                actionItemName: "Eclaircissage",
                backgroundColor: "#7dd3fc",
            }, item, "thinning");
            dynamicEvents.push({...thinningEvent});
        }
        if(item.plantation){
            const plantationEvent = getDynamicEvent(item.plantation, {
                actionItemName: "Plantation",
                backgroundColor: "#bef264",
            }, item, "plantation");
            dynamicEvents.push({...plantationEvent});
        }
        if(item.harvest){
            const harvestEvent = getDynamicEvent(item.harvest, {
                actionItemName: "Récolte",
                backgroundColor: "#fde68a",
            }, item, "harvest");
            dynamicEvents.push({...harvestEvent});
        }
    });
    const sortedEvents = dynamicEvents.sort((a, b) => {
        return a.start.getTime() - b.start.getTime();
    });
    const etalonnage = sortedEvents.map((sortedItem, index) => {
        const isE = ((index % 2) === 0);
        isE ? sortedItem.start = new Date(sortedItem.start.setDate(sortedItem.start.getDate() + 1)) : sortedItem;
        return sortedItem;
    }
     );
    return etalonnage;
};



    const oceanic = () => {
        const dynamicEvents: EventType[] = []; 
        nativesEvents.map((item) => {
            if(item.nursery){
                const nurseryEvent = getDynamicEvent(item.nursery + 1, {
                    actionItemName: "Semis pépinière",
                    backgroundColor: "#5eead4"
                }, item, "nursery");
                dynamicEvents.push({...nurseryEvent});
            }
            if(item.seedling){
                const seedlingEvent = getDynamicEvent(item.seedling + 1, {
                    actionItemName: "Semis",
                    backgroundColor: "#fed7aa",
                }, item, "seedling");
                dynamicEvents.push({...seedlingEvent});
            }
            if(item.transplanting){
                const transplantingEvent = getDynamicEvent(item.transplanting + 1, {
                    actionItemName: "Repiquage",
                    backgroundColor: "#fca5a5",
                }, item, "transplanting");
                dynamicEvents.push({...transplantingEvent});
            }
            if(item.thinning){
                const thinningEvent = getDynamicEvent(item.thinning + 1, {
                    actionItemName: "Eclaircissage",
                    backgroundColor: "#7dd3fc",
                }, item, "thinning");
                dynamicEvents.push({...thinningEvent});
            }
            if(item.plantation){
                const plantationEvent = getDynamicEvent(item.plantation + 1, {
                    actionItemName: "Plantation",
                    backgroundColor: "#bef264",
                }, item, "plantation");
                dynamicEvents.push({...plantationEvent});
            }
            if(item.harvest){
                const harvestEvent = getDynamicEvent(item.harvest + 1, {
                    actionItemName: "Récolte",
                    backgroundColor: "#fde68a",
                }, item, "harvest");
                dynamicEvents.push({...harvestEvent});
            }
        // const nurseryEvent = getDynamicEvent(item.nursery+1, "Semis pépinière", item);
        // const seedlingEvent = getDynamicEvent(item.seedling+1, "Semis", item);
        // const transplantingEvent = getDynamicEvent(item.transplanting+1, "Repiquage", item);
        // const thinningEvent = getDynamicEvent(item.thinning+1, "Eclaircissage", item);
        // const plantationEvent = getDynamicEvent(item.plantation+1, "Plantation", item);
        // const harvestEvent = getDynamicEvent(item.harvest+1, "Récolte", item);
        // dynamicEvents.push(nurseryEvent);
        // dynamicEvents.push({...seedlingEvent});
        // dynamicEvents.push({...transplantingEvent});
        // dynamicEvents.push({...thinningEvent});
        // dynamicEvents.push({...plantationEvent});
        // dynamicEvents.push({...harvestEvent});
    });
    const sortedEvents = dynamicEvents.sort((a, b) => {
        return a.start.getTime() - b.start.getTime();
    });
    const etalonnage = sortedEvents.map((sortedItem, index) => {
        const isE = ((index % 2) === 0);
        isE ? sortedItem.start = new Date(sortedItem.start.setDate(sortedItem.start.getDate() + 1)) : sortedItem;
        return sortedItem;
    }
     );
    return etalonnage;
};
    const halfOceanic = () => {
        const dynamicEvents: EventType[] = [];
        nativesEvents.map((item) => {
            if(item.nursery){
                const nurseryEvent = getDynamicEvent(item.nursery + 2, {
                    actionItemName: "Semis pépinière",
                    backgroundColor: "#5eead4"
                }, item, "nursery");
                dynamicEvents.push({...nurseryEvent});
            }
            if(item.seedling){
                const seedlingEvent = getDynamicEvent(item.seedling + 2, {
                    actionItemName: "Semis",
                    backgroundColor: "#fed7aa",
                }, item, "seedling");
                dynamicEvents.push({...seedlingEvent});
            }
            if(item.transplanting){
                const transplantingEvent = getDynamicEvent(item.transplanting + 2, {
                    actionItemName: "Repiquage",
                    backgroundColor: "#fca5a5",
                }, item, "transplanting");
                dynamicEvents.push({...transplantingEvent});
            }
            if(item.thinning){
                const thinningEvent = getDynamicEvent(item.thinning + 2, {
                    actionItemName: "Eclaircissage",
                    backgroundColor: "#7dd3fc",
                }, item, "thinning");
                dynamicEvents.push({...thinningEvent});
            }
            if(item.plantation){
                const plantationEvent = getDynamicEvent(item.plantation + 2, {
                    actionItemName: "Plantation",
                    backgroundColor: "#bef264",
                }, item, "plantation");
                dynamicEvents.push({...plantationEvent});
            }
            if(item.harvest){
                const harvestEvent = getDynamicEvent(item.harvest + 2, {
                    actionItemName: "Récolte",
                    backgroundColor: "#fde68a",
                }, item, "harvest");
                dynamicEvents.push({...harvestEvent});
            }
        // const nurseryEvent = getDynamicEvent(item.nursery+2, "Semis pépinière", item);
        // const seedlingEvent = getDynamicEvent(item.seedling+2, "Semis", item);
        // const transplantingEvent = getDynamicEvent(item.transplanting+2, "Repiquage", item);
        // const thinningEvent = getDynamicEvent(item.thinning+2, "Eclaircissage", item);
        // const plantationEvent = getDynamicEvent(item.plantation+2, "Plantation", item);
        // const harvestEvent = getDynamicEvent(item.harvest+2, "Récolte", item);
        // dynamicEvents.push(nurseryEvent);
        // dynamicEvents.push({...seedlingEvent});
        // dynamicEvents.push({...transplantingEvent});
        // dynamicEvents.push({...thinningEvent});
        // dynamicEvents.push({...plantationEvent});
        // dynamicEvents.push({...harvestEvent});
    },);
    // return dynamicEvents;
    const sortedEvents = dynamicEvents.sort((a, b) => {
        return a.start.getTime() - b.start.getTime();
    });
    const etalonnage = sortedEvents.map((sortedItem, index) => {
        const isE = ((index % 2) === 0);
        isE ? sortedItem.start = new Date(sortedItem.start.setDate(sortedItem.start.getDate() + 1)) : sortedItem;
        return sortedItem;
    }
     );
    return etalonnage;
};
    const continent = () => {
        const dynamicEvents: EventType[] = []; 
        nativesEvents.map((item) => {
            if(item.nursery){
                const nurseryEvent = getDynamicEvent(item.nursery + 2, {
        actionItemName: "Semis pépinière",
        backgroundColor: "#5eead4"
    }, item, "nursery");
                dynamicEvents.push({...nurseryEvent});
            }
            if(item.seedling){
                const seedlingEvent = getDynamicEvent(item.seedling + 2, {
                    actionItemName: "Semis",
                    backgroundColor: "#fed7aa",
                }, item, "seedling");
                dynamicEvents.push({...seedlingEvent});
            }
            if(item.transplanting){
                const transplantingEvent = getDynamicEvent(item.transplanting + 2, {
                    actionItemName: "Repiquage",
                    backgroundColor: "#fca5a5",
                }, item, "transplanting");
                dynamicEvents.push({...transplantingEvent});
            }
            if(item.thinning){
                const thinningEvent = getDynamicEvent(item.thinning + 2, {
                    actionItemName: "Eclaircissage",
                    backgroundColor: "#7dd3fc",
                }, item, "thinning");
                dynamicEvents.push({...thinningEvent});
            }
            if(item.plantation){
                const plantationEvent = getDynamicEvent(item.plantation + 2, {
                    actionItemName: "Plantation",
                    backgroundColor: "#bef264",
                }, item, "plantation");
                dynamicEvents.push({...plantationEvent});
            }
            if(item.harvest){
                const harvestEvent = getDynamicEvent(item.harvest + 2, {
                    actionItemName: "Récolte",
                    backgroundColor: "#fde68a",
                }, item, "harvest");
                dynamicEvents.push({...harvestEvent});
            }
        // const nurseryEvent = getDynamicEvent(item.nursery+2, "Semis pépinière", item);
        // const seedlingEvent = getDynamicEvent(item.seedling+2, "Semis", item);
        // const transplantingEvent = getDynamicEvent(item.transplanting+2, "Repiquage", item);
        // const thinningEvent = getDynamicEvent(item.thinning+2, "Eclaircissage", item);
        // const plantationEvent = getDynamicEvent(item.plantation+2, "Plantation", item);
        // const harvestEvent = getDynamicEvent(item.harvest+2, "Récolte", item);
        // dynamicEvents.push(nurseryEvent);
        // dynamicEvents.push({...seedlingEvent});
        // dynamicEvents.push({...transplantingEvent});
        // dynamicEvents.push({...thinningEvent});
        // dynamicEvents.push({...plantationEvent});
        // dynamicEvents.push({...harvestEvent});
    });
    const sortedEvents = dynamicEvents.sort((a, b) => {
        return a.start.getTime() - b.start.getTime();
    });
    const etalonnage = sortedEvents.map((sortedItem, index) => {
        const isE = ((index % 2) === 0);
        isE ? sortedItem.start = new Date(sortedItem.start.setDate(sortedItem.start.getDate() + 1)) : sortedItem;
        return sortedItem;
    }
     );
    return etalonnage;
};
    const mountain = () => {
        const dynamicEvents: EventType[] = []; 
        nativesEvents.map((item) => {
            if(item.nursery){
                const nurseryEvent = getDynamicEvent(item.nursery + 3, {
                    actionItemName: "Semis pépinière",
                    backgroundColor: "#5eead4"
                }, item, "nursery");
                dynamicEvents.push({...nurseryEvent});
            }
            if(item.seedling){
                const seedlingEvent = getDynamicEvent(item.seedling + 3, {
                    actionItemName: "Semis",
                    backgroundColor: "#fed7aa",
                }, item, "seedling");
                dynamicEvents.push({...seedlingEvent});
            }
            if(item.transplanting){
                const transplantingEvent = getDynamicEvent(item.transplanting + 3, {
                    actionItemName: "Repiquage",
                    backgroundColor: "#fca5a5",
                }, item, "transplanting");
                dynamicEvents.push({...transplantingEvent});
            }
            if(item.thinning){
                const thinningEvent = getDynamicEvent(item.thinning + 3, {
                    actionItemName: "Eclaircissage",
                    backgroundColor: "#7dd3fc",
                }, item, "thinning");
                dynamicEvents.push({...thinningEvent});
            }
            if(item.plantation){
                const plantationEvent = getDynamicEvent(item.plantation + 3, {
                    actionItemName: "Plantation",
                    backgroundColor: "#bef264",
                }, item, "plantation");
                dynamicEvents.push({...plantationEvent});
            }
            if(item.harvest){
                const harvestEvent = getDynamicEvent(item.harvest + 3, {
                    actionItemName: "Récolte",
                    backgroundColor: "#fde68a",
                }, item, "harvest");
                dynamicEvents.push({...harvestEvent});
            }
        // const nurseryEvent = getDynamicEvent(item.nursery+3, "Semis pépinière", item);
        // const seedlingEvent = getDynamicEvent(item.seedling+3, "Semis", item);
        // const transplantingEvent = getDynamicEvent(item.transplanting+3, "Repiquage", item);
        // const thinningEvent = getDynamicEvent(item.thinning+3, "Eclaircissage", item);
        // const plantationEvent = getDynamicEvent(item.plantation+3, "Plantation", item);
        // const harvestEvent = getDynamicEvent(item.harvest+3, "Récolte", item);
        // dynamicEvents.push(nurseryEvent);
        // dynamicEvents.push({...seedlingEvent});
        // dynamicEvents.push({...transplantingEvent});
        // dynamicEvents.push({...thinningEvent});
        // dynamicEvents.push({...plantationEvent});
        // dynamicEvents.push({...harvestEvent});
    });
    const sortedEvents = dynamicEvents.sort((a, b) => {
        return a.start.getTime() - b.start.getTime();
    });
    const etalonnage = sortedEvents.map((sortedItem, index) => {
        const isE = ((index % 2) === 0);
        isE ? sortedItem.start = new Date(sortedItem.start.setDate(sortedItem.start.getDate() + 1)) : sortedItem;
        return sortedItem;
    }
     );
    return etalonnage;
};

  return {
    mediter,
    oceanic,
    halfOceanic,
    continent,
    mountain,
    potager
  };
};

