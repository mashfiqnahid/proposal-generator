import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateOverview } from '../features/proposalSlice';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

const ProposalOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const overview = useAppSelector((state) => state.proposal.overview);

  // Initialize the Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: overview,
    onUpdate: ({ editor }) => {
      // Update the overview in the Redux store whenever the editor content changes
      dispatch(updateOverview(editor.getHTML()));
    },
  },[overview]);

  return (
    <div>
      <h3>Overview</h3>
      <EditorContent editor={editor} />
    </div>
  );
};

export default ProposalOverview;
