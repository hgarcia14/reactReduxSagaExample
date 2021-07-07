import React, { useState, useEffect } from 'react';
import FileManager, { Permissions } from 'devextreme-react/file-manager';
import CustomFileSystemProvider from 'devextreme/file_management/custom_provider';
import spanish from '../../assets/fonts/es.json';
import { locale, loadMessages } from 'devextreme/localization';
import * as _ from 'lodash';

const FilesManager = ( {fileManagerRef, empleadoStoreRef} ) => {


    const [ files, setFiles ] = useState( [] );

    useEffect( () => {

        fileManagerRef.current = files;
        loadMessages( spanish );
        locale( navigator.language );
        // eslint-disable-next-line
      }, [files] );

    const customFileProvider = new CustomFileSystemProvider( {
        getItems,
        deleteItem,
        uploadFileChunk
    } );

    function getItems( pathInfo ) {
        let items = [];
        if( !_.isEmpty( empleadoStoreRef.current ) ){
            if( !_.isEmpty( JSON.parse( empleadoStoreRef.current.archivos ) ) ){
                items = _.concat( items, JSON.parse( empleadoStoreRef.current.archivos ))
            }
        }

        if( !_.isEmpty( files ) ){
            items = _.concat( items, files.map( file => { return {name: file.name, isDirectory: false, size: file.size} } ) );
        }
        
        return _.isEmpty( items ) ? [] : items;

    }

    function deleteItem( item ) {

    }

    function uploadFileChunk( file, uploadInfo, destinationDirectory ) {

        setFiles( files => [...files, file] );

    }

    return ( 
        <FileManager fileSystemProvider={customFileProvider} >
            <Permissions
                delete={true}
                upload={true}
                download={true}>
            </Permissions>
        </FileManager>
     );
}
 
export default FilesManager;