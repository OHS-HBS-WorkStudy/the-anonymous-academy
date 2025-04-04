
import React, { useState } from "react";

export default function CreateThreadAside({ruleAgreement, setRuleAgreement}) {

      const [isOpenRuleSet1, setIsOpenRuleSet1] = useState(false);
      const [isOpenRuleSet2, setIsOpenRuleSet2] = useState(false);
      const [isOpenRuleSet3, setIsOpenRuleSet3] = useState(false);
    
      const toggleGeneral = () => setIsOpenRuleSet1(!isOpenRuleSet1);
      const toggleCommunication = () => setIsOpenRuleSet2(!isOpenRuleSet2);
      const toggleContent = () => setIsOpenRuleSet3(!isOpenRuleSet3);

    return (
        <aside>
        <div className="threadRules">
          <div onClick={toggleGeneral} className="drowdown">
            <h2>General Guidelines</h2>
            <span className="drowdown-arrow">{isOpenRuleSet1 ? '▲' : '▼'}</span>
          </div>
          {isOpenRuleSet1 && (
            <div>
              <p>
                These are the general rules to keep in mind when creating a thread.
              </p>
              <ul>
                <li>
                  <strong>Strict Topic Adherence:</strong> Threads must remain strictly on topic. Off-topic posts will be removed.
                </li>
                <li>
                  <strong>Constructive Contributions Only:</strong> Only helpful and constructive questions and information are permitted.
                </li>
              </ul>
            </div>
          )}

          <div onClick={toggleCommunication} className="drowdown">
            <h2>Communication Guidelines</h2>
            <span className="drowdown-arrow">{isOpenRuleSet2 ? '▲' : '▼'}</span>
          </div>
          {isOpenRuleSet2 && (
            <div>
              <p>
                These rules are for how you communicate with other users.
              </p>
              <ul>
                <li>
                  <strong>Respectful Communication:</strong> Absolutely no personal attacks, insults, or harassment. Treat all users with the utmost respect. Any deviation will result in immediate moderation.
                </li>
                <li>
                  <strong>No Swearing or Foul Language:</strong> Profanity or offensive language is strictly forbidden. Any instance will lead to thread removal and potential account action.
                </li>
                <li>
                  <strong>Zero Tolerance for Bullying:</strong> Bullying, intimidation, or any harmful behavior will not be tolerated under any circumstances.
                </li>
              </ul>
            </div>
          )}

          <div onClick={toggleContent} className="drowdown">
            <h2>Content Guidelines</h2>
            <span className="drowdown-arrow">{isOpenRuleSet3 ? '▲' : '▼'}</span>
          </div>
          {isOpenRuleSet3 && (
            <div>
              <p>
                These rules are for the type of content you post.
              </p>
              <ul>
                <li>
                  <strong>No Spam or Self-Promotion:</strong> Avoid posting irrelevant links, advertisements, or excessive self-promotional content.
                </li>
              </ul>
            </div>
          )}

          <p style={{marginTop: '15px'}}>
            By creating a thread, you <b>explicitly agree</b> to these strict guidelines. Failure to comply will result in immediate moderation actions, including thread removal and potential account suspension.
          </p>
          <label className="rule-checkbox" style={{marginTop: '15px'}}>
            <input
              type="checkbox"
              checked={ruleAgreement}
              onChange={() => setRuleAgreement(!ruleAgreement)}
              required
             
            />
            <span  className="required"><b> I have read and agree to the thread creation guidelines.</b></span>
          </label>
        </div>
      </aside>
    );
}