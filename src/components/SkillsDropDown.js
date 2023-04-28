import React, {useEffect} from 'react';
import {SKILL_LIST} from "../consts";

const SkillsDropDown = ({ skills }) => {
    const skillsDropdownNames= SKILL_LIST.map(skill => skill.name);
    const [difficultyChosen, setDifficultyChosen] = React.useState(0);
    const [randomNumber, setRandomNumber] = React.useState(0);

    //const allSkills =

    const [skill, setSkill] = React.useState(skills.find(skill => skill.name === skillsDropdownNames[0]));
    const [isChooseCharacterSkillSuccessfull, setIsChooseCharacterSkillSuccessfull] = React.useState(false);
    const [computedNumber, setComputedNumber] = React.useState(0);


    useEffect(() => {
        console.log({ skills });
        setSkill(skills.find(skill => skill.name === skill.name));
    }, [skills]);

    const handleRoll = () =>  {
        const randomNumber = Math.floor(Math.random() * 20) + 1;
        setRandomNumber(randomNumber);
        const doesMeetSelectionCriteria = randomNumber + skill.value >= difficultyChosen;
        setComputedNumber(randomNumber + skill.value);
        setIsChooseCharacterSkillSuccessfull(doesMeetSelectionCriteria);
    }

    const handleSkillSelection = (e) => {
        const skillName = e.target.value;
        const skill = skills.find(skill => skill.name === skillName);
        console.log({ skill });
        setSkill(skill);
    }

    return (
        <div>
            <h1>SkillsDropDown</h1>
            <select onChange={(e) => handleSkillSelection(e) }>
                {skillsDropdownNames.map(skill => <option key={skill}>{skill}</option>)}
            </select>
            <input type={"text"} value={difficultyChosen} onChange={(e) => {
                const value = +e.target.value;
                if(typeof  value === "number")
                    setDifficultyChosen(+e.target.value)
                else
                    setDifficultyChosen(0)
            }}/>

            <button onClick={handleRoll}>Roll</button>
            {randomNumber}

            {
                skill ? <> {skill.name} {skill.value} </> : null


            }

            {
                isChooseCharacterSkillSuccessfull ? <>skill check is successful {computedNumber}  </> : <>skill check is a failure {computedNumber}</>
            }
        </div>
    );
};

export default SkillsDropDown;