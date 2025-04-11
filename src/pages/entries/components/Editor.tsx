import { PureComponent } from "react";
import autosize from "autosize";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// const TypedEditor: any = RDW;

export default class Editer extends PureComponent {
  state = {
    editor: EditorState.createEmpty(),
    editorHTML: "",
    showCode: false,
  };

  onEditorStateChange = (editor: any) => {
    const editorHTML = draftToHtml(convertToRaw(editor.getCurrentContent()));
    this.setState({ editor, editorHTML });
  };

  onEditEditorHTML = (e: any) => {
    const editorHTML = e.target.value;

    let editor;
    const contentBlock = htmlToDraft(editorHTML);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      editor = EditorState.createWithContent(contentState);
    } else {
      editor = EditorState.createEmpty();
    }
    this.setState({ editor, editorHTML });
  };

  toggleEditorCode = () => {
    const { showEditorCode } = this.state as any;
    this.setState({ showEditorCode: !showEditorCode }, () => {
      if (!showEditorCode) {
        autosize((this as any).textareaEditor);
        autosize.update((this as any).textareaEditor);
      } else {
        autosize.destroy((this as any).textareaEditor);
      }
    });
  };

  submit = (e: any) => {
    e.preventDefault();
    const { editorHTML } = this.state;
    console.log(editorHTML);
  };

  render() {
    const { editor, editorHTML, showEditorCode } = this.state as any;

    const ShowEditorCode = () => (
      <div className="rdw-option-wrapper" onClick={this.toggleEditorCode}>
        {showEditorCode ? "Hide" : "Show"} Code
      </div>
    );

    return (
      <form name="form" onSubmit={this.submit} autoComplete="off">
        <div>
          <Editor
            editorState={editor}
            editorClassName={showEditorCode ? "editor" : "editorHide"}
            onEditorStateChange={this.onEditorStateChange}
            toolbarCustomButtons={[<ShowEditorCode />]}
          />
          {showEditorCode && (
            <textarea
              ref={(c) => {
                (this as any).textareaEditor = c;
              }}
              value={editorHTML}
              onChange={this.onEditEditorHTML}
            />
          )}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}
