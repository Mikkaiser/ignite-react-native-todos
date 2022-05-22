
import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/editIcon.png';

interface Props {
    index: number;
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTaskTitle: string) => void;
}

export default ({ index, task, toggleTaskDone, removeTask, editTask } : Props) => {

    const [isEditing, setIsEditing] = useState(false);
    const [newTitleTaskValue, setnewTitleTaskValue] = useState(task.title);

    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setnewTitleTaskValue(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, newTitleTaskValue);
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])

    return(
        <>
        <View>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
            >
                <View
                    testID={`marker-${index}`}
                    style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                    {task.done && (
                        <Icon
                            name="check"
                            size={12}
                            color="#FFF" />
                    )}
                </View>

                <TextInput 
                    ref={textInputRef}
                    style={ task.done ? styles.taskTextDone : styles.taskText}
                    value={newTitleTaskValue}
                    editable={isEditing}
                    onChangeText={setnewTitleTaskValue}
                    onSubmitEditing={handleSubmitEditing}
                    keyboardType='ascii-capable'
                />
            </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
            { isEditing ? (
                <TouchableOpacity
                    onPress={handleCancelEditing}
                >
                    <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={handleStartEditing}
                >
                <Image source={editIcon} />
                </TouchableOpacity>
            ) }

            <TouchableOpacity
                disabled={isEditing}
                onPress={() => removeTask(task.id)}
            >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
            </TouchableOpacity>
        </View>
        </>
    )
}


const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})