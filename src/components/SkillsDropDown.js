import React, { useEffect, useState, useRef } from 'react';
import { SKILL_LIST } from '../consts';

const SkillsDropDown = ({ skills }) => {
  const skillsDropdownNames = SKILL_LIST.map((skill) => skill.name);
  const [difficultyChosen, setDifficultyChosen] = React.useState(0);
  const [randomNumber, setRandomNumber] = React.useState(0);

  const [allSkills, setAllSkills] = useState(skills);
  const [selectedSkill, setSelectedSkill] = React.useState(
    allSkills.find((skill) => skill.name === skillsDropdownNames[0])
  );
  const prevSkillSelectedRef = useRef(
    allSkills.find((skill) => skill.name === skillsDropdownNames[0])
  );
  const [
    isChooseCharacterSkillSuccessfully,
    setIsChooseCharacterSkillSuccessfully
  ] = React.useState(false);
  const [computedNumber, setComputedNumber] = React.useState(0);

  useEffect(() => {
    setAllSkills(skills);
  }, [skills]);

  useEffect(() => {
    prevSkillSelectedRef.current = selectedSkill;
  }, [selectedSkill]);

  useEffect(() => {
    const skill = allSkills.find(
      (skill) => skill.name === prevSkillSelectedRef.current.name
    );
    setSelectedSkill(skill);
  }, [allSkills]);

  const handleRoll = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setRandomNumber(randomNumber);
    const doesMeetSelectionCriteria =
      randomNumber + selectedSkill.value >= difficultyChosen;
    setComputedNumber(randomNumber + selectedSkill.value);
    setIsChooseCharacterSkillSuccessfully(doesMeetSelectionCriteria);
  };

  const handleSkillSelection = (e) => {
    const skillName = e.target.value;
    const skill = allSkills.find((skill) => skill.name === skillName);
    setSelectedSkill(skill);
  };

  const handleDifficultyChosenInputChange = (e) => {
    const value = +e.target.value;
    if (!isNaN(value)) {
      setDifficultyChosen(+e.target.value);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 450,
        alignItems: 'center',
        margin: 'auto',
        gap: 2
      }}
    >
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <div> Random Number: {randomNumber}</div>
        {selectedSkill ? (
          <div>
            Selected Skill: {selectedSkill.name}, Skill points:{' '}
            {selectedSkill.value}
          </div>
        ) : null}

        {isChooseCharacterSkillSuccessfully ? (
          <h3>skill check is successful </h3>
        ) : (
          <h3>skill check is a failure </h3>
        )}
      </div>
    </div>
  );
};

export default SkillsDropDown;
