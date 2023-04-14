import { useState, type Dispatch, type SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TiTick } from "react-icons/ti";
import { ClimateStep } from "./Form/ClimateStep";
import { getClimate } from "./Form/Map";
import { SelectionStep } from "./Form/SelectionStep";

const Stepper = ({complete, setComplete}: {complete: boolean, setComplete: Dispatch<SetStateAction<boolean>>}) => {
  
  const steps = ["Sélection", "Climat", "Préférences"];
  const [currentStep, setCurrentStep] = useState<number>(1);
  // const [complete, setComplete] = useState(false);
  const nestedInput = (step: number) => {

    switch(step) {
      case 1:
        return <SelectionStep />;
      case 2:
        return <ClimateStep />;
      default:
        break;
    }
  };
  const climate = getClimate().climate;
  return (
    <>
      <div className="w-full flex justify-center p-6">
        
        {steps.map((step, i) => (
          <div key={i}>
          <div
            className = { (currentStep === i + 1) ? "step-item active": "step-item complete"} 
            // className={`step-item ${currentStep === i + 1} active ${
            //   (i + 1 < currentStep || complete)} complete`}
            >
             
            <div className="step" >
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            { steps.indexOf(step)+1 === currentStep ? <p className="text-grayscale">{step}</p> : <></> }
           
          </div>
        </div>
        ))}
      </div>
      <div className="h-[55%] w-full flex justify-center">
        <>
          { nestedInput(currentStep) }
        </>
        </div>
      {!complete && (
        (currentStep == 2 && climate == -1) ?
        <button
          disabled
          className="cursor-no-drop mt-10 text-gray font-bold bg-primary hover:bg-gradient-to-br focus:outline-none rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-none"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Suivant" : "Suivant"}
        </button>
        :
        <button
          className="mt-10 text-gray font-bold bg-primary hover:bg-gradient-to-br focus:outline-none rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-none"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Suivant" : "Suivant"}
        </button>
      )}
     { complete && currentStep === steps.length && <button className="text-gray font-bold bg-primary hover:bg-gradient-to-br 
          focus:outline-none rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-none">Ajouter au calendrier</button> }
    </>
  );
};

export default Stepper;

export const WizardStepper = ({setShowModal}: {setShowModal: Dispatch<SetStateAction<boolean>>}) => {

// type FormInputs = {
//   selection: VegetableType[];
//   climateIndex: number;
//   preferencesDays: string[];
//   preferencesCalendar: string[];
// };

const [complete, setComplete] = useState(false);
// const selectionStorage = JSON.parse(localStorage.getItem("selection") ?? JSON.stringify({"selection1":{vegetable:{}, selected: false}}));
// const [selection] = useState(selectionStorage);

// const {values} = useWizard();

const methods = useForm({
    defaultValues: {
      selection: [],
      climateIndex: 0, 
      preferencesDays: [],
      preferencesCalendar: []
    },
  });

  const onSubmit = () => {
    if(complete){
      setShowModal(false);
      localStorage.setItem("isCalendarEmpty", "false");
    }
  };
  // const keys = Object.keys(values);
  
  return (
        <>
          <FormProvider {...methods}>
            <form className="w-full h-full flex flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
            <>
            {/* <div className="flex">
            { keys.map((key, index) => {
                  return (
                  <div key={index} className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                      <Image src={values[index]?.icon} width={80} height={80} alt="légume"/>
                      <span className="sr-only">{values[index]?.name}</span>
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">X</div>
                  </div>
                  );
            })}
        </div> */}
                <Stepper complete={complete} setComplete={setComplete}/>
                </>
            </form>
          </FormProvider>
        </>
      );
};


