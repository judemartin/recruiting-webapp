import React, { useEffect, useState } from 'react';
import { SKILL_LIST } from '../consts';

const SkillsDropDown = ({ skills }) => {
  const skillsDropdownNames = SKILL_LIST.map((skill) => skill.name);
  const [difficultyChosen, setDifficultyChosen] = React.useState(0);
  const [randomNumber, setRandomNumber] = React.useState(0);

  const [allSkills, setAllSkills] = useState(skills);
  const [skill, setSkill] = React.useState(
    allSkills.find((skill) => skill.name === skillsDropdownNames[0])
  );
  const [
    isChooseCharacterSkillSuccessfull,
    setIsChooseCharacterSkillSuccessfull
  ] = React.useState(false);
  const [computedNumber, setComputedNumber] = React.useState(0);

  useEffect(() => {
    setAllSkills(skills);
  }, [skills]);

  useEffect(() => {
    const skill = allSkills.find((skill) => skill.name === skill.name);
    console.log({ skill });
    setSkill(skill);
  }, [allSkills]);

  const handleRoll = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setRandomNumber(randomNumber);
    const doesMeetSelectionCriteria =
      randomNumber + skill.value >= difficultyChosen;
    setComputedNumber(randomNumber + skill.value);
    setIsChooseCharacterSkillSuccessfull(doesMeetSelectionCriteria);
  };

  const handleSkillSelection = (e) => {
    const skillName = e.target.value;
    const skill = allSkills.find((skill) => skill.name === skillName);
    console.log({ skill });
    setSkill(skill);
  };

  const handleDifficultyChosenInputChange = (e) => {
    const value = +e.target.value;
    if (!isNaN(value)) {
      setDifficultyChosen(+e.target.value);
    }
  };

  return (
    <div>
      <h1>SkillsDropDown</h1>
      <select onChange={(e) => handleSkillSelection(e)}>
        {skillsDropdownNames.map((skill) => (
          <option key={skill}>{skill}</option>
        ))}
      </select>
      <input
        type={'text'}
        value={difficultyChosen}
        onChange={(e) => handleDifficultyChosenInputChange(e)}
      />
      <button onClick={handleRoll}>Roll</button>
      {randomNumber}

      {skill ? (
        <>
          {skill.name} {skill.value}
        </>
      ) : null}

      {isChooseCharacterSkillSuccessfull ? (
        <>skill check is successful {computedNumber} </>
      ) : (
        <>skill check is a failure {computedNumber}</>
      )}
    </div>
  );
};

export default SkillsDropDown;
