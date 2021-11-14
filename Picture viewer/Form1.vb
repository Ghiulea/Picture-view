

Imports System.Windows.Forms
Imports WindowsApplication1.My.MySettings
Imports System.Drawing.Image

Public Class Form1

    Dim iImageNumber As Integer

   
    Private Property CurrentPicture As Integer

    Private CurrentDirectoryFiles As New List(Of String)

    Private SupportedImageFileTypes As List(Of String) = New List(Of String) From {".png", ".gif", ".tif", ".jpg", ".ico"}


    Dim Files() As String
    Dim Pointer As Integer

    Private Property ObjectModel As Control.ControlCollection


   
    Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

        OpenFileDialog1.ShowDialog()
        For Each File As String In FileIO.FileSystem.GetFiles(FileIO.FileSystem.GetParentPath(OpenFileDialog1.FileName))
            If SupportedImageFileTypes.Contains(FileIO.FileSystem.GetFileInfo(File).Extension) Then
                CurrentDirectoryFiles.Add(File)
            End If
        Next
        CurrentPicture = CurrentDirectoryFiles.IndexOf(OpenFileDialog1.FileName)
        PictureBox1.ImageLocation = OpenFileDialog1.FileName

    End Sub

    Private Sub showButton_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles showButton.Click
        ' Show the Open File dialog. If the user clicks OK, load the
        ' picture that the user chose.
        If OpenFileDialog1.ShowDialog() = DialogResult.OK Then
            PictureBox1.Load(OpenFileDialog1.FileName)
        End If

    End Sub

    Private Sub clearButton_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles clearButton.Click
        ' Clear the picture.
        PictureBox1.Image = Nothing
    End Sub

    Private Sub OpenFileDialog1_FileOk(ByVal sender As System.Object, ByVal e As System.ComponentModel.CancelEventArgs) Handles OpenFileDialog1.FileOk
        Static imagenumber As Integer
        Try
            imagenumber -= 1
            imagenumber = 0
            If imagenumber = 0 Or imagenumber < 0 Then
                imagenumber = ++1

                PictureBox1.SizeMode = PictureBoxSizeMode.StretchImage
            End If

        Catch ex As Exception
            MsgBox(ex.Message)
        End Try


    End Sub

    Private Sub backgroundButton_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles backgroundButton.Click
        ' Show the color dialog box. If the user clicks OK, change the
        ' PictureBox control's background to the color the user chose.
        If ColorDialog1.ShowDialog() = DialogResult.OK Then
            PictureBox1.BackColor = ColorDialog1.Color
        End If

    End Sub

    Private Sub closeButton_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles closeButton.Click
        ' Close the form.
        Close()
    End Sub

    Private Sub CheckBox1_CheckedChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles CheckBox1.CheckedChanged
        ' If the user selects the Stretch check box, change 
        ' the PictureBox's SizeMode property to "Stretch". If the user 
        ' clears the check box, change it to "Normal".
        If CheckBox1.Checked Then
            PictureBox1.SizeMode = PictureBoxSizeMode.StretchImage
        Else
            PictureBox1.SizeMode = PictureBoxSizeMode.Normal
        End If

    End Sub
  


    Private Sub btnNext_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnNext.Click
        Static imagenumber As Integer
        Do
            Pointer = (Pointer + 1)
        Loop Until btnNext.Focus
        Try
            'PictureBox1.Image = imagenumber.Equals(Files(Pointer))

            imagenumber -= 1
            imagenumber = 1
            If CurrentPicture = CurrentDirectoryFiles.Count - 1 Then
                CurrentPicture = 0
            Else
                CurrentPicture += 1
            End If
            ObjectModel = PictureBox1.Container


        Catch ex As Exception
            MsgBox(ex.Message)
            ' Mesaje box from program 
        End Try

    End Sub

    Private Sub setImages()
        Throw New NotImplementedException
    End Sub
    '// btnPrevious.
    Private Sub Button1_Click_1(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        '// check if Not first image Then subtract -1, Else set # for last Image if wanting to loop thru images.
        If Not iImageNumber = 0 Then iImageNumber -= 1 Else iImageNumber = ImageList1.Images.Count - 1
        '// used ImageList1.Images.Count since both PictureBoxes seem to work with the same amount of images and no need to check both ImageLists.
        setImages()
    End Sub
End Class
