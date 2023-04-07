import { useState, type Dispatch, type SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TiTick } from "react-icons/ti";
// import { type VegetableType } from "~/lib/scheme/vegetables";
import { ClimateStep } from "./Form/ClimateStep";
import { PreferencesStep } from "./Form/PreferencesStep";
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
      case 3:
        return <PreferencesStep />;
      default:
        break;
    }
  };
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
      <div className="flex justify-center">
        { nestedInput(currentStep) }
        </div>
      {!complete && (
        <button
          className="mt-10 text-gray font-bold bg-primary hover:bg-gradient-to-br 
          focus:outline-none rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-none"
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
  return (
        <>
          <FormProvider {...methods}>
            <form className="flex flex-col items-center" onSubmit={methods.handleSubmit(onSubmit)}>
                <Stepper complete={complete} setComplete={setComplete}/>
            </form>
          </FormProvider>
        </>
      );
};


