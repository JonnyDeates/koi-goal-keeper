import PrivacyPolicyStore from "./PrivacyPolicyStore";

const PrivacyPolicy = () => {

    const {Introduction, Terms, Conclusion} = PrivacyPolicyStore;
    const TermKeys = Object.keys(Terms) as Array<keyof typeof Terms>;

    return <>
        <p>&emsp;{Introduction}</p>
        {TermKeys.map((key, index)=> <label key={index}>{key} <span>{Terms[key]}</span></label>)}
        <p>&emsp;{Conclusion}</p>
    </>
}
export default PrivacyPolicy;