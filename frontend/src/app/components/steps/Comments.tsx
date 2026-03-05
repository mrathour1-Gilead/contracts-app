import { forwardRef } from "react";
import { BaseFormStep } from "./base/BaseFormStep";
import type { StepHandle } from "./types/StepHandle";
import { convertFormRowsToData } from "../../utils/formFieldUtils";
import { COMMENTS_DEFAULT_ROWS } from "./constants/defaultRows";
import type { CommentsData } from "../../types";

interface CommentsProps {
  contractData?: any;
}

export const Comments = forwardRef<StepHandle, CommentsProps>(
  ({ contractData }, ref) => {
    return (
      <BaseFormStep
        ref={ref}
        title="Comments"
        defaultRows={COMMENTS_DEFAULT_ROWS}
        existingRows={contractData?.comments}
        transformData={(rows) => ({
          comments: convertFormRowsToData<CommentsData>(rows),
          step: 5,
        })}
      />
    );
  }
);

Comments.displayName = "Comments";