import { type EventType } from "../scheme/events";

export type nativeEvent = {
    id: string;
    plantId: number;
    nursery: number,
    seedling: number,
    transplanting: number,
    thinning: number,
    plantation: number,
    harvest: number,
}

export const dynamicEvents = (nativesEvents: nativeEvent[]) => {

    const plants = [
    {
        id: 1,
        createdAt: 1681398350,
        thumbnail: "https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_640.jpg",
        name: "Tomate",
        category: "légume",
        family: "Solanaceae",
        gender: "Solanum",
        seedling: "Mars à Mai",
        harvest: "Mi-Juin à Novembre",
        exposition: "Ensoleillé",
        seedlingInfo: "",
        cultureInfo: "",
        harvestInfo: "",
        water: 2,
    },
    {
        id: 2,
        createdAt: 1681398350,
        thumbnail: "https://cdn.pixabay.com/photo/2018/06/22/13/52/beetroot-3490809_640.jpg",
        name: "Betterave",
        category: "légume",
        family: "Chenopodiaceae",
        gender: "Beta",
        seedling: "Mars à Mai",
        harvest: "Mi-Juin à Novembre",
        exposition: "Mi-Ombre",
        seedlingInfo: "",
        cultureInfo: "",
        harvestInfo: "",
        water: 3,
    }
];

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

    const getDynamicEvent = (actionItem: number, actionItemName: string, item: nativeEvent) => {
        const infos = getPlantInfos(item.plantId);
        const title = `${actionItemName} de ${infos[0]?.name}`;
        const start = DateIso({week: actionItem, year: 2023}).ISOweekStart;
        const extProps = Object.keys(item)[actionItem];
        const dynamicEvent = {
            id: actionItemName+item.plantId,
            title: title,
            start: start,
            extendedProps: {action: extProps}
        };
        return dynamicEvent;
    };

    const mediter = () => {
        const dynamicEvents: EventType[] = []; 
        nativesEvents.map((item) => {
        const nurseryEvent = getDynamicEvent(item.nursery, "Semis pépinière", item);
        const seedlingEvent = getDynamicEvent(item.seedling, "Semis", item);
        const transplantingEvent = getDynamicEvent(item.transplanting, "Repiquage", item);
        const thinningEvent = getDynamicEvent(item.thinning, "Eclaircissage", item);
        const plantationEvent = getDynamicEvent(item.plantation, "Plantation", item);
        const harvestEvent = getDynamicEvent(item.harvest, "Récolte", item);
        dynamicEvents.push(nurseryEvent);
        dynamicEvents.push({...seedlingEvent});
        dynamicEvents.push({...transplantingEvent});
        dynamicEvents.push({...thinningEvent});
        dynamicEvents.push({...plantationEvent});
        dynamicEvents.push({...harvestEvent});
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
        const nurseryEvent = getDynamicEvent(item.nursery+1, "Semis pépinière", item);
        const seedlingEvent = getDynamicEvent(item.seedling+1, "Semis", item);
        const transplantingEvent = getDynamicEvent(item.transplanting+1, "Repiquage", item);
        const thinningEvent = getDynamicEvent(item.thinning+1, "Eclaircissage", item);
        const plantationEvent = getDynamicEvent(item.plantation+1, "Plantation", item);
        const harvestEvent = getDynamicEvent(item.harvest+1, "Récolte", item);
        dynamicEvents.push(nurseryEvent);
        dynamicEvents.push({...seedlingEvent});
        dynamicEvents.push({...transplantingEvent});
        dynamicEvents.push({...thinningEvent});
        dynamicEvents.push({...plantationEvent});
        dynamicEvents.push({...harvestEvent});
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
        const nurseryEvent = getDynamicEvent(item.nursery+2, "Semis pépinière", item);
        const seedlingEvent = getDynamicEvent(item.seedling+2, "Semis", item);
        const transplantingEvent = getDynamicEvent(item.transplanting+2, "Repiquage", item);
        const thinningEvent = getDynamicEvent(item.thinning+2, "Eclaircissage", item);
        const plantationEvent = getDynamicEvent(item.plantation+2, "Plantation", item);
        const harvestEvent = getDynamicEvent(item.harvest+2, "Récolte", item);
        dynamicEvents.push(nurseryEvent);
        dynamicEvents.push({...seedlingEvent});
        dynamicEvents.push({...transplantingEvent});
        dynamicEvents.push({...thinningEvent});
        dynamicEvents.push({...plantationEvent});
        dynamicEvents.push({...harvestEvent});
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
        const nurseryEvent = getDynamicEvent(item.nursery+2, "Semis pépinière", item);
        const seedlingEvent = getDynamicEvent(item.seedling+2, "Semis", item);
        const transplantingEvent = getDynamicEvent(item.transplanting+2, "Repiquage", item);
        const thinningEvent = getDynamicEvent(item.thinning+2, "Eclaircissage", item);
        const plantationEvent = getDynamicEvent(item.plantation+2, "Plantation", item);
        const harvestEvent = getDynamicEvent(item.harvest+2, "Récolte", item);
        dynamicEvents.push(nurseryEvent);
        dynamicEvents.push({...seedlingEvent});
        dynamicEvents.push({...transplantingEvent});
        dynamicEvents.push({...thinningEvent});
        dynamicEvents.push({...plantationEvent});
        dynamicEvents.push({...harvestEvent});
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
        const nurseryEvent = getDynamicEvent(item.nursery+3, "Semis pépinière", item);
        const seedlingEvent = getDynamicEvent(item.seedling+3, "Semis", item);
        const transplantingEvent = getDynamicEvent(item.transplanting+3, "Repiquage", item);
        const thinningEvent = getDynamicEvent(item.thinning+3, "Eclaircissage", item);
        const plantationEvent = getDynamicEvent(item.plantation+3, "Plantation", item);
        const harvestEvent = getDynamicEvent(item.harvest+3, "Récolte", item);
        dynamicEvents.push(nurseryEvent);
        dynamicEvents.push({...seedlingEvent});
        dynamicEvents.push({...transplantingEvent});
        dynamicEvents.push({...thinningEvent});
        dynamicEvents.push({...plantationEvent});
        dynamicEvents.push({...harvestEvent});
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
  };
};

