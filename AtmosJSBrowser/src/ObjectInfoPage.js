/*

 Copyright (c) 2011-2013, EMC Corporation

 All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the EMC Corporation nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 */
ObjectInfoPage = function( entry, objectInfo, templateEngine ) {
    this.templates = templateEngine;
    this.$root = jQuery( templateEngine.get( 'objectInfoPage' ).render( {objectInfo: objectInfo}, ['.atmosReplicaList'] ) );
    this.$replicaList = this.$root.find( '.atmosReplicaList' ).empty();

    if ( objectInfo.replicas ) {
        for ( var i = 0; i < objectInfo.replicas.length; i++ ) {
            this.addReplica( objectInfo.replicas[i] );
        }
    }

    var modalWindow = new ModalWindow( templateEngine.get( 'objectInfoPageTitle' ).render( {name: entry.name || entry.id} ), this.$root, templateEngine );

    this.$root.find( '.atmosCloseButton' )[0].onclick = function() {
        modalWindow.remove();
    }
};
ObjectInfoPage.prototype.addReplica = function( replica ) {
    var $replica = jQuery( this.templates.get( 'objectInfoReplica' ).render( {replica: replica} ) );
    this.$replicaList.append( $replica );
};
