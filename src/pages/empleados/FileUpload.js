import React from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
const componentConfig = {

  //iconFiletypes: ['.jpg', '.pdf', '.docs'],
  showFiletypeIcon: true,

postUrl:'https://crolnom035restapi.azurewebsites.net/api/empleados',
// postUrl: 'http://localhost:8787/cloudcrm/uploadFile',
  //postUrl: 'http://52.76.214.13:8091/cloudcrm/uploadFile',
  
};

const dzConfig = {
  addRemoveLinks: true,
  // params: {
  //   imageType: this.props.imageType
  // }
};

class DropUploader extends React.Component {
    static propTypes = {
      initialMedia: PropTypes.array,
      //onUpload: PropTypes.function,
      //onRemove: MyPropTypes.function
    };

    static defaultProps = {
      initialMedia: [],

      onUpload: () => {},
      onRemove: () => {}
    };

    state = {
      media: [],
      attacmentId: [],
    };

    componentWillReceiveProps(props){
      debugger
      console.log("dpwnload attachmeny",props)
      this.setState({
        initialMedia: [],
      })
      this.removedfi=(props)=>{
        let { media } = this.state;
        const removedMedia = this.state.media[0];
        media = media.filter(m => m.id !== removedMedia.id);
        this.setState({ media });
      };
    }

    componentDidMount() {
      // Check initialMedia if there is any copy from props to state
      const {
        initialMedia
      } = this.props;
      if (initialMedia.length > 0) {
        this.setState({
          media: initialMedia
        });
      }
    }
    removedfiles=(file)=>{
      debugger
      let { media } = this.state;
            if (media.length > 0) {
              const removedMedia = this.state.media[0];
              media = media.filter(m => m.id !== removedMedia.id);
              this.setState({ media }, () => this.props.onRemove(removedMedia));
              this.props.RemoveAttachment(removedMedia);
            }
    }

    sucessUpload = (res) => {
      debugger
      let {media}=this.state;
      this.setState({
        media:[...media,res],
        attacmentId: res.attachmentId,
      })
      this.props.onUpload(res);
    }

  render() {
    return (
      <div>
      <DropzoneComponent
        config={componentConfig}
        eventHandlers={{
          success: file => {
            const res = JSON.parse(file.xhr.responseText);
            
            this.sucessUpload(res);
          },
          removedfile: file => {
            debugger
            this.removedfiles(file)
          }
        }}
        djsConfig={dzConfig}
      />
      </div>
    );
  }
}

export default DropUploader;