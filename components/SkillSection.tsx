import { PureComponent, ReactNode } from "react";

import { resolveScopedStyles } from "../common/helpers";
import SkillSet from "../components/SkillSet";
import SkillViewModel from "../models/SkillViewModel";

import { SKILL_TYPE_DISPLAY } from "../common/constants";

interface ISkillSectionProps {
  skills: SkillViewModel[];
}

interface ISkillSectionState {
  renderResult: ReactNode;
}

const scoped = resolveScopedStyles(
  <div>
    <style jsx>{`
      div {
        display: flex;

        flex-wrap: wrap;
      }
    `}</style>
  </div>
);

export default class SkillSection extends PureComponent {
  public props: ISkillSectionProps;
  public state: ISkillSectionState;

  constructor(props: ISkillSectionProps) {
    super(props);

    this.state = { renderResult: "" };
  }

  public componentDidMount() {
    if (this.props.skills.length) {
      this.setState({ renderResult: this.renderSkills(this.props.skills) });
    }
  }

  public render() {
    return (
      <>
        <div className={scoped.className}>{this.state.renderResult}</div>
        {scoped.styles}
      </>
    );
  }

  private renderSkills(skills: SkillViewModel[]) {
    if (!skills.length) {
      return <p>Sorry. Nothing to show.</p>;
    }

    const skillSets: {
      [key: string]: JSX.Element[];
    } = {};

    skills.forEach(skill => {
      if (skillSets.hasOwnProperty(skill.type)) {
        skillSets[skill.type].push(<li>{skill.name}</li>);
      } else {
        skillSets[skill.type] = [<li>{skill.name}</li>];
      }
    });

    return Object.keys(skillSets).map(type => (
      <SkillSet>
        <h5>{SKILL_TYPE_DISPLAY[parseInt(type, 10)]}</h5>
        <ul>{skillSets[type]}</ul>
      </SkillSet>
    ));
  }
}